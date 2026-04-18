# Deployments

## 1. Fund deployer

Use the [0G testnet faucet](https://faucet.0g.ai/) for the wallet you will use as `PRIVATE_KEY`.

## 2. Deploy core + DeFi stack

From the repo root:

```bash
export PRIVATE_KEY=0x...   # hex string, same as elsewhere in this repo
forge script script/DeployAll.s.sol:DeployAllScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Optional — **testing-phase KYC bypass** (same broadcast as deploy): set `KYC_BYPASS_ON_DEPLOY=1` or `true` so `ComplianceRegistry.setKycBypass(true)` runs. Requires a `ComplianceRegistry` that includes `kycBypass` (redeploy if your deployment is older).

If you already deployed, call once as compliance admin:

```bash
cast send <COMPLIANCE_REGISTRY> "setKycBypass(bool)" true \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --private-key "$PRIVATE_KEY"
```

Copy logged addresses into `deployments/testnet.json` (start from [testnet.example.json](testnet.example.json)), including **`ComplianceRegistry`**, **`PropertyShareProof`**, and **`OgStaking`** when present. Set `deployedAt` (ISO date) and `deployer` (checksummed address) for your records.

### Community guestbook (optional, separate deploy)

The on-chain guestbook ([`src/guestbook/CommunityGuestbook.sol`](../src/guestbook/CommunityGuestbook.sol)) is **not** part of `DeployAll`. Deploy with the same RPC and key:

```bash
forge script script/DeployGuestbook.s.sol:DeployGuestbookScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Set **`NEXT_PUBLIC_GUESTBOOK`** in `web/.env.local` to the logged contract address (use **`NEXT_PUBLIC_BASE_GUESTBOOK`** for a Base deployment).

For production NFT metadata, set **`NFT_BASE_URI`** when running `DeployAll` (public HTTPS URL ending with `/`, e.g. `https://your.app/api/nft/`) so wallet `tokenURI` resolves to your Next.js `GET /api/nft/[tokenId]` route.

### Token economics (seed scripts)

[`script/SeedTokenSupply.sol`](../script/SeedTokenSupply.sol) sets each property’s share **supply cap** so that one **whole token** (`1e18` wei) matches about **$1,000 notional** in the demo (with a 110% buffer on token count). This does **not** fix a USD price on-chain; primary issuers set OG prices separately (see [Primary share sale](#6-primary-share-sale-optional) and [`docs/primary-sale.md`](../docs/primary-sale.md)).

## 3. Seed demo properties + share tokens

Set contract addresses from step 2:

```bash
export PROPERTY_REGISTRY=0x...
export PROPERTY_SHARE_FACTORY=0x...
# optional: who receives initial mint (defaults to deployer)
export TREASURY_ADDRESS=0x...
```

### Option A — Seven properties in one go (empty registry)

Use this only if **no** properties are registered yet (fresh `PropertyRegistry` after `DeployAll`):

```bash
forge script script/SeedSevenProperties.s.sol:SeedSevenPropertiesScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Registers parcel refs `DEMO-AT-001-…` through `DEMO-AT-007-…` and creates share tokens **OG1**–**OG7**.

### Option B — Three first, then four more (typical upgrade)

If you already ran `SeedThreeProperties` and have propertyIds **1–3**, add **4–7** (Reifnitz, LandMark, 1210, 1010) with:

```bash
forge script script/SeedFourMoreProperties.s.sol:SeedFourMorePropertiesScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Do **not** run Option A after Option B — duplicate external refs would revert.

### Legacy: three US-CA demo parcels only

```bash
forge script script/SeedThreeProperties.s.sol:SeedThreePropertiesScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Update `deployments/testnet.json` with `propertyId` and `shareToken` from the broadcast output or explorer if you track them there.

## 4. Bootstrap AMM liquidity (0G)

After shares exist in the treasury wallet, add **WETH + share** liquidity so the Trade page can quote swaps. Each new `OgPair` must be allowlisted on `ComplianceRegistry` (the script does this).

Set:

- `OG_ROUTER`, `OG_WETH`, `COMPLIANCE_REGISTRY`, `PROPERTY_SHARE_FACTORY` (same addresses as in `testnet.json` under `contracts`).
- `BOOTSTRAP_WETH_WEI` — native OG to wrap per pool (e.g. `1000000000000000000` for 1 OG).
- `BOOTSTRAP_SHARE_WEI` — share amount per side (e.g. `1000000000000000000` for 1 whole share).
- `START_PROPERTY_ID` / `END_PROPERTY_ID` — inclusive range of `propertyId`s to bootstrap (default `1` and `7` if unset).

The broadcast wallet must hold enough **OG** and **share tokens** (treasury is usually the deployer after seeding).

```bash
export PRIVATE_KEY=0x...
export OG_ROUTER=0x...
export OG_WETH=0x...
export COMPLIANCE_REGISTRY=0x...
export PROPERTY_SHARE_FACTORY=0x...
export BOOTSTRAP_WETH_WEI=1000000000000000000
export BOOTSTRAP_SHARE_WEI=1000000000000000000
export START_PROPERTY_ID=1
export END_PROPERTY_ID=3

forge script script/BootstrapLiquidity.s.sol:BootstrapLiquidityScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Alternatively, use the **Pool** page in the web app with the same wrap / approve / add steps.

## 5. Staking rewards (`OgStaking`)

`DeployAll` deploys [`OgStaking`](../src/staking/OgStaking.sol). Put its address in `deployments/testnet.json` as `OgStaking` and sync web env so `NEXT_PUBLIC_STAKING` is set.

Fund a reward period (native OG, **with** the transaction value):

```bash
cast send <OG_STAKING_ADDRESS> "notifyRewardAmount(uint256)" 604800 \
  --value 10ether \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --private-key "$PRIVATE_KEY"
```

`604800` is seconds (7 days); adjust duration and reward amount as needed. Caller must have `REWARD_ROLE` (default: deployer admin).

## 6. Primary share sale (optional)

For **issuer primary** sales that only sell **whole shares** (minimum one full share at a fixed native-OG price), deploy [`PrimaryShareSale`](../src/PrimaryShareSale.sol):

```bash
export PRIMARY_SHARE_TOKEN=0x...   # RestrictedPropertyShareToken
export PRIMARY_SELLER=0x...        # treasury (must approve shares to the sale contract)
export PRIMARY_PRICE_WEI_PER_SHARE=1000000000000000000   # example: 1 OG per full share

forge script script/DeployPrimaryShare.s.sol:DeployPrimaryShareScript \
  --rpc-url https://evmrpc-testnet.0g.ai \
  --broadcast
```

Then the seller approves the sale contract and buyers call `buyWholeShares(uint256 numWholeShares)` with `msg.value == numWholeShares * price`. See [`docs/primary-sale.md`](../docs/primary-sale.md). OTC-only primary (no contract) is also fine.

### 6a. Base: settlement token + ERC-20 checkout (optional)

On Base, you can deploy a **fixed-supply** [`PlatformSettlementToken`](../src/PlatformSettlementToken.sol) and use [`PrimaryShareSaleERC20`](../src/PrimaryShareSaleERC20.sol) + [`PurchaseEscrowERC20`](../src/PurchaseEscrowERC20.sol) for checkout in a single ERC-20. Fund the deployer with **ETH on Base** for gas.

**1) Mint the settlement token to a Safe (no post-deploy mint):**

```bash
export PLATFORM_TOKEN_NAME="Building Culture"
export PLATFORM_TOKEN_SYMBOL=BCULT
# example: 1B tokens * 1e18
export PLATFORM_TOKEN_INITIAL_SUPPLY_WEI=1000000000000000000000000000
export PLATFORM_TOKEN_RECEIVER=0x...   # multisig

forge script script/DeployPlatformSettlement.s.sol:DeployPlatformSettlementScript \
  --rpc-url https://mainnet.base.org \
  --broadcast
```

**2) Escrow for the same payment token** (uses the same `PropertyRegistry` as your Base deploy):

```bash
export PROPERTY_REGISTRY=0x...   # from base-mainnet.json
export PAYMENT_TOKEN=0x...      # PlatformSettlementToken from step 1

forge script script/DeployPurchaseEscrowERC20.s.sol:DeployPurchaseEscrowERC20Script \
  --rpc-url https://mainnet.base.org \
  --broadcast
```

**3) Primary sale in payment token** (per property / share token):

```bash
export PRIMARY_SHARE_TOKEN=0x...
export PRIMARY_PAYMENT_TOKEN=0x...
export PRIMARY_SELLER=0x...
export PRIMARY_PRICE_PER_SHARE=...   # payment token units per 1e18 share units

forge script script/DeployPrimaryShareERC20.s.sol:DeployPrimaryShareERC20Script \
  --rpc-url https://mainnet.base.org \
  --broadcast
```

**4) Point the web app at each sale:** add one object per property to [`web/src/data/primary-sales.json`](../web/src/data/primary-sales.json) (`propertyId`, `chainId` `8453`, `saleAddress`, Base USDC `paymentToken`, `paymentDecimals` `6`, `paymentSymbol` `USDC`). Optional: merge extra rows at build time via `NEXT_PUBLIC_PRIMARY_SALES_JSON` (same schema). See [`docs/primary-sale.md`](../docs/primary-sale.md). Without this file, buyers can still purchase via `cast send` / block explorer; the Trade **Primary** panel stays in “not configured” until entries exist.

**Go-live order (typical):** deploy share tokens → deploy `PrimaryShareSaleERC20` per offering → seller approves shares and (if needed) sets price → add `primary-sales.json` rows → **optionally** run `BootstrapLiquidity` (or use the Pool UI) so **secondary** ETH swaps work; primary USDC checkout does **not** need the internal AMM pool.

Add `PlatformSettlementToken` and `PurchaseEscrowERC20` addresses to [`base-mainnet.json`](base-mainnet.json) and run `python3 scripts/sync_web_env.py deployments/base-mainnet.json` to update `NEXT_PUBLIC_BASE_PLATFORM_TOKEN` and `NEXT_PUBLIC_BASE_PURCHASE_ESCROW_ERC20`. See also [`docs/token-policy.md`](../docs/token-policy.md) and [`docs/liquidity-bootstrap.md`](../docs/liquidity-bootstrap.md).

**One-shot deploy + merge (recommended):** [`deploy-base-settlement.sh`](../scripts/deploy-base-settlement.sh) runs [`DeploySettlementBundle.s.sol`](../script/DeploySettlementBundle.s.sol) so **both contracts share one broadcast** (avoids nonce collisions from two sequential `forge script` runs). From the repo root, with `PRIVATE_KEY` and `PLATFORM_TOKEN_RECEIVER` in [`.env`](../.env):

```bash
# optional: BASE_RPC_URL=https://...  (Alchemy/Infura on Base)
export PLATFORM_TOKEN_RECEIVER=0x...   # your Base Safe / treasury
./scripts/deploy-base-settlement.sh
python3 scripts/merge_settlement_from_broadcast.py --write deployments/base-mainnet.json
python3 scripts/sync_web_env.py deployments/base-mainnet.json >> web/.env.local
cd web && npm run build
```

`merge_settlement_from_broadcast.py` prefers `broadcast/DeploySettlementBundle.s.sol/8453/run-latest.json`, otherwise the separate settlement + escrow broadcasts. **Run the merge only after a real mainnet broadcast** (not a local anvil fork) so the addresses match Base.

**Dry run on a Base fork (no real ETH):** in one terminal, `anvil --fork-url https://mainnet.base.org` then set `BASE_RPC_URL=http://127.0.0.1:8545` and use an anvil test key (see anvil output) to run the same script. Do not copy those addresses into `base-mainnet.json` for production.

## 7. Web app

Generate env lines from this JSON:

```bash
python3 scripts/sync_web_env.py deployments/testnet.json > web/.env.local
```

Optional: add `siteUrl` to `deployments/testnet.json` (public origin, no trailing slash) so `NEXT_PUBLIC_SITE_URL` is emitted for NFT metadata and share links.

### Base mainnet (chain id 8453)

The same Foundry [`DeployAll.s.sol`](../script/DeployAll.s.sol) stack can be broadcast on Base. Fund the deployer wallet with **ETH on Base** for gas. [`foundry.toml`](../foundry.toml) loads **`PRIVATE_KEY`** from the repo root **`.env`** (same deploy wallet you use for 0G testnet only works if that key controls an address funded on Base).

Set a public **`NFT_BASE_URI`** (HTTPS URL ending with `/`) so `PropertyShareProof` metadata resolves (e.g. `https://buildingculture.capital/api/nft/`). Do **not** set **`KYC_BYPASS_ON_DEPLOY`** on mainnet unless you intentionally want the compliance bypass.

Helper script (5s delay before broadcast):

```bash
export NFT_BASE_URI=https://buildingculture.capital/api/nft/
# Optional: export BASE_RPC_URL=https://...   if mainnet.base.org rate-limits
./scripts/deploy-base-mainnet.sh
```

Or invoke Foundry directly:

```bash
export NFT_BASE_URI=https://buildingculture.capital/api/nft/
forge script script/DeployAll.s.sol:DeployAllScript \
  --rpc-url https://mainnet.base.org \
  --broadcast
```

Use a dedicated RPC (Alchemy, Infura, etc.) via `BASE_RPC_URL` or `--rpc-url` if the public endpoint rate-limits broadcasts. Copy addresses from the script output or `broadcast/DeployAll.s.sol/8453/` into [`base-mainnet.json`](base-mainnet.json) (same schema as [`testnet.example.json`](testnet.example.json)).

Append Base env lines to `web/.env.local` (merge with 0G lines from `testnet.json`):

```bash
python3 scripts/sync_web_env.py deployments/base-mainnet.json >> web/.env.local
```

Optional: verify contracts on Basescan with `forge verify-contract` and `BASESCAN_API_KEY`.

Or copy manually from [web/.env.local.example](../web/.env.local.example).

```bash
cd web && npm run dev
```

### Docker production build

Next.js inlines **`NEXT_PUBLIC_*` at image build time**. Set contract addresses in a repo-root **`.env`** (see [`.env.docker.example`](../.env.docker.example)), then build — runtime `environment:` in Compose does **not** fix missing client bundle env.

```bash
cp .env.docker.example .env
# Edit .env: set 0G addresses from `python3 scripts/sync_web_env.py deployments/testnet.json` (and optional guestbook).
docker compose build --no-cache && docker compose up -d
```

On the server, pull the repo, copy or merge `.env`, rebuild, and restart the `web` container so the site serves both 0G and Base addresses baked into the client.

### Base governance (Safe multisig)

Set **`NEXT_PUBLIC_BASE_GOVERNANCE_SAFE`** to your Safe address on Base (e.g. from [Safe{Wallet}](https://app.safe.global)). The web app shows it on **`/contracts`** and **`/mission`** with links to Basescan and the Safe app. This is **protocol governance**, not an end-user wallet.

**On-chain migration (operators):** After `DeployAll`, the deployer EOA typically holds `DEFAULT_ADMIN_ROLE` (and related roles) on core contracts. To move control to the Safe:

1. From the current admin, **`grantRole`** the same roles to the Safe address, then **`revokeRole`** from the EOA (or batch via Safe Transaction Builder).
2. Move **treasury** assets intended for the protocol from the EOA to the Safe where applicable.
3. Verify on Basescan that admin roles point at the Safe.

No new Solidity is required — use existing `AccessControl` methods.

## Security

Do **not** commit `testnet.json` or `.env.local` with real keys. Keep `testnet.example.json` only as a template.

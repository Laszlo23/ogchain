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

## 7. Web app

Generate env lines from this JSON:

```bash
python3 scripts/sync_web_env.py deployments/testnet.json > web/.env.local
```

Optional: add `siteUrl` to `deployments/testnet.json` (public origin, no trailing slash) so `NEXT_PUBLIC_SITE_URL` is emitted for NFT metadata and share links.

### Base mainnet (chain id 8453)

The same Foundry [`DeployAll.s.sol`](../script/DeployAll.s.sol) stack can be broadcast on Base. Fund the deployer with **ETH on Base** for gas, set a public **`NFT_BASE_URI`** (HTTPS, trailing `/`) for proof NFT metadata, and avoid **`KYC_BYPASS_ON_DEPLOY`** on mainnet unless intended.

```bash
forge script script/DeployAll.s.sol:DeployAllScript \
  --rpc-url https://mainnet.base.org \
  --broadcast
```

Use a dedicated RPC (Alchemy, Infura, etc.) via `--rpc-url` if the public endpoint rate-limits broadcasts. Copy addresses from `broadcast/DeployAll.s.sol/8453/` into [`base-mainnet.json`](base-mainnet.json) (same schema as [`testnet.example.json`](testnet.example.json)).

Append Base env lines to `web/.env.local` (merge with 0G lines from `testnet.json`):

```bash
python3 scripts/sync_web_env.py deployments/base-mainnet.json >> web/.env.local
```

Optional: verify contracts on Basescan with `forge verify-contract` and `BASESCAN_API_KEY`.

Or copy manually from [web/.env.local.example](../web/.env.local.example).

```bash
cd web && npm run dev
```

## Security

Do **not** commit `testnet.json` or `.env.local` with real keys. Keep `testnet.example.json` only as a template.

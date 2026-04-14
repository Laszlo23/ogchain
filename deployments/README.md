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

Copy logged addresses into `deployments/testnet.json` (start from [testnet.example.json](testnet.example.json)), including **`ComplianceRegistry`**, **`PropertyShareProof`**, and **`OgStaking`** when present.

For production NFT metadata, set **`NFT_BASE_URI`** when running `DeployAll` (public HTTPS URL ending with `/`, e.g. `https://your.app/api/nft/`) so wallet `tokenURI` resolves to your Next.js `GET /api/nft/[tokenId]` route.

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

## 4. Web app

Generate env lines from this JSON:

```bash
python3 scripts/sync_web_env.py deployments/testnet.json > web/.env.local
```

Or copy manually from [web/.env.local.example](../web/.env.local.example).

```bash
cd web && npm run dev
```

## Security

Do **not** commit `testnet.json` or `.env.local` with real keys. Keep `testnet.example.json` only as a template.

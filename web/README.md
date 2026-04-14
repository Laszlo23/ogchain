# Building Culture web app

Next.js 15 app (App Router) for **0G Galileo**: browse properties, **buy** share tokens with native OG, **investor hub** (`/invest`), **stake** native OG (`/stake`), **market** (AMM + roadmap secondary), **pool** liquidity (WETH + shares), **portfolio**, **onboarding**, **lend**, **admin** (role-gated), KYC-aware flows, optional **WalletConnect**, and optional **proof NFT** certificates.

## Grant / demo checklist

Use this before submitting a grant or recording a demo video:

1. **Build:** `npm run build` completes with no errors.
2. **Env:** `cp .env.local.example .env.local` and fill addresses from [deployments/README.md](../deployments/README.md) (or `scripts/sync_web_env.py`).
3. **Chain:** Wallet on 0G testnet with faucet OG; wrap to WETH when testing pool/add liquidity.
4. **Narrative:** Call out **illustrative** funding/yield UI vs **on-chain** swaps/LP — see [docs/grants.md](../docs/grants.md).
5. **Legal:** Show the in-app **Legal** page; state testnet / not investment advice in voiceover or README.

## Setup

```bash
cd web
cp .env.local.example .env.local
# Fill contract addresses from deployment, or from repo root:
# python3 scripts/sync_web_env.py deployments/testnet.json > web/.env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Connect via **injected** wallets or **WalletConnect** when `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set.

## Environment variables

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_OG_RPC` | 0G JSON-RPC URL |
| `NEXT_PUBLIC_EXPLORER` | Block explorer base (tx + address links) |
| `NEXT_PUBLIC_REGISTRY` | `PropertyRegistry` |
| `NEXT_PUBLIC_SHARE_FACTORY` | `PropertyShareFactory` |
| `NEXT_PUBLIC_COMPLIANCE_REGISTRY` | `ComplianceRegistry` (KYC gate for restricted shares) |
| `NEXT_PUBLIC_WETH` | `WETH9` (routing + pool) |
| `NEXT_PUBLIC_ROUTER` | `OgRouter` |
| `NEXT_PUBLIC_LENDING_POOL` | `SimpleLendingPool` (optional) |
| `NEXT_PUBLIC_PREDICTION_MARKET` | `BinaryPredictionMarket` |
| `NEXT_PUBLIC_PROOF_NFT` | `PropertyShareProof` ERC-721 (optional certificates) |
| `NEXT_PUBLIC_STAKING` | `OgStaking` native staking + rewards |
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | WalletConnect Cloud project id (optional; browser wallets work without it) |
| `NEXT_PUBLIC_ADMIN_PREVIEW` | Set to `1` to show `/admin` layout without on-chain roles (testnet only) |
| `NEXT_PUBLIC_SITE_URL` | Public site origin (NFT metadata `external_url`) |

Server-only: `OPENAI_API_KEY` in `web/.env.local` for the Guide AI (`/guide`).

Backend (optional): `DATABASE_URL`, `RELAYER_PRIVATE_KEY`, `COMPLIANCE_REGISTRY_ADDRESS`, `KYC_WEBHOOK_SECRET` — see API routes under `src/app/api/`.

## Scripts

- `npm run dev` — development server  
- `npm run build` — production build  
- `npm run lint` — ESLint  

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home + funding meter (demo stats) + trust strip |
| `/onboarding` | Wallet → KYC → deposit → invest |
| `/guide` | Checklist + optional AI assistant |
| `/properties` | On-chain listings + demo cards |
| `/properties/[id]` | Property detail + buy CTA |
| `/trade` | Buy shares (OG → share); `?property=` supported |
| `/market` | Secondary / AMM narrative + roadmap CLOB |
| `/pool` | Add/remove liquidity (WETH + property share) |
| `/portfolio` | Wallet balances + diversification (demo USD) |
| `/invest` | Investor hub: overview, property links, liquidity shortcuts |
| `/stake` | Native OG staking, rewards, cooldown unstake |
| `/admin` | Deployment health, registrar readout, compliance `setWalletStatus` (gated by roles) |
| `/lend` | Lending pool UI |
| `/issuer` | Issuer intake form |
| `/markets` | Prediction markets |
| `/legal` | Risk / terms + grant transparency |
| `/api/nft/[tokenId]` | ERC-721 metadata JSON for proof NFTs |

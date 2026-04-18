# Primary share sale (optional)

The [`PrimaryShareSale`](../src/PrimaryShareSale.sol) contract sells **whole** property share tokens from a treasury address at a fixed **native OG** price per full share (`1e18` token units). Each purchase must be for **at least one full share**, matching the demo economics where one whole share represents **$1,000 notional** (see [`SeedTokenSupply`](../script/SeedTokenSupply.sol)).

- **Secondary / AMM**: Fractional amounts remain possible on the `OgRouter` pools; this contract does not change DEX behavior.
- **Compliance**: Both treasury (`seller`) and buyer must satisfy [`RestrictedPropertyShareToken`](../src/RestrictedPropertyShareToken.sol) rules (e.g. verified wallets, or testnet KYC bypass).
- **Setup**: Deploy with [`script/DeployPrimaryShare.s.sol`](../script/DeployPrimaryShare.s.sol), then `approve` the sale contract from the seller, and optionally call `setPrice` (seller only).

OTC-only primary issuance (no extra contract) is also valid: treasury transfers whole-share multiples manually.

## ERC-20 checkout (Base / settlement token)

For primary sales denominated in a single ERC-20 (e.g. Base USDC), use [`PrimaryShareSaleERC20`](../src/PrimaryShareSaleERC20.sol). Buyers `approve` the payment token, then call `buyWholeShares`; treasury must `approve` share transfers to the sale contract.

Deploy with [`script/DeployPrimaryShareERC20.s.sol`](../script/DeployPrimaryShareERC20.s.sol). Environment variables: `PRIMARY_SHARE_TOKEN`, `PRIMARY_PAYMENT_TOKEN`, `PRIMARY_SELLER`, `PRIMARY_PRICE_PER_SHARE` (payment units per `1e18` share wei).

### Web app wiring

The Trade page loads a **Primary (issuer)** panel when you map each property to a deployed sale contract:

1. Add an entry to [`web/src/data/primary-sales.json`](../web/src/data/primary-sales.json) (or pass the same JSON via `NEXT_PUBLIC_PRIMARY_SALES_JSON` at build time). Each row needs `propertyId` (decimal string), `chainId`, `saleAddress`, `paymentToken`, `paymentDecimals`, and `paymentSymbol` (e.g. USDC on Base uses 6 decimals).

2. Ensure the sale contract’s `shareToken()` matches the share token from `PropertyShareFactory` for that `propertyId`.

3. Treasury must approve the sale contract to pull shares; buyers approve the payment token then purchase whole shares.

Primary checkout **does not require** an internal AMM pool. Secondary swaps still need a seeded `WETH / share` pair (see [`docs/liquidity-bootstrap.md`](liquidity-bootstrap.md)).

Native-currency [`PrimaryShareSale`](../src/PrimaryShareSale.sol) remains appropriate for 0G testnet demos where checkout is in the chain’s native asset.

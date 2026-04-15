# Primary share sale (optional)

The [`PrimaryShareSale`](../src/PrimaryShareSale.sol) contract sells **whole** property share tokens from a treasury address at a fixed **native OG** price per full share (`1e18` token units). Each purchase must be for **at least one full share**, matching the demo economics where one whole share represents **$1,000 notional** (see [`SeedTokenSupply`](../script/SeedTokenSupply.sol)).

- **Secondary / AMM**: Fractional amounts remain possible on the `OgRouter` pools; this contract does not change DEX behavior.
- **Compliance**: Both treasury (`seller`) and buyer must satisfy [`RestrictedPropertyShareToken`](../src/RestrictedPropertyShareToken.sol) rules (e.g. verified wallets, or testnet KYC bypass).
- **Setup**: Deploy with [`script/DeployPrimaryShare.s.sol`](../script/DeployPrimaryShare.s.sol), then `approve` the sale contract from the seller, and optionally call `setPrice` (seller only).

OTC-only primary issuance (no extra contract) is also valid: treasury transfers whole-share multiples manually.

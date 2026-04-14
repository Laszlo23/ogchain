# OG Property Share Token (og-RE-share)

This repository defines a **property-backed ERC-20** used for fractional exposure to a single entry in [`PropertyRegistry`](./domain-model.md). It is **not** legal title; see [compliance.md](./compliance.md).

## Goals

- **Bind** each share token contract to exactly one `propertyId` and the canonical `PropertyRegistry` address.
- **Reference** rich metadata (JSON on IPFS, HTTPS, or 0G Storage gateways) via `metadataURI`.
- Stay **compatible** with ERC-20 wallets, DEX routers, and future **transfer restrictions** (e.g. ERC-3643-style) via wrapper or upgraded token.

## Required on-chain data

| Field | Type | Description |
|-------|------|-------------|
| `registry` | `address` | `PropertyRegistry` for this deployment. |
| `propertyId` | `uint256` | Must exist in `registry` at creation time (enforced by factory). |
| `metadataURI` | `string` | URI for off-chain JSON (name, geo, SPV docs, 0G root refs). |
| `supplyCap` | `uint256` | `0` means uncapped; else `totalSupply() <= supplyCap`. |

## Interface: `IPropertyShareToken`

Implemented in [`src/interfaces/IPropertyShareToken.sol`](../src/interfaces/IPropertyShareToken.sol). Implementations MUST expose:

- ERC-20: `name`, `symbol`, `decimals`, `totalSupply`, `balanceOf`, `transfer`, `approve`, `transferFrom`, `allowance`
- `function propertyId() external view returns (uint256);`
- `function REGISTRY() external view returns (address);` (immutable registry)
- `function metadataURI() external view returns (string memory);`
- `function supplyCap() external view returns (uint256);`
- Events as in the interface file, including `PropertyShareDeployed` / indexing-friendly `PropertyShareCreated` from the factory

## Minting

- **MINTER_ROLE** (OpenZeppelin `AccessControl`) may mint up to `supplyCap`.
- Factory typically grants **MINTER** to the property `recordOwner` (or leaves admin to configure).

## Compliance extensions (optional)

- **Permissioned:** replace token with an [ERC-3643](https://eips.ethereum.org/EIPS/eip-3643)-style security token that calls your identity registry on `transfer`.
- **Wrapper:** keep this ERC-20 as the “underlying” and wrap with a restricted ERC-20 wrapper that checks allowlists.

## Metadata JSON (off-chain, example)

```json
{
  "title": "Example parcel",
  "propertyId": "1",
  "registry": "0x...",
  "jurisdiction": "US-CA",
  "documents": [{ "kind": "DEED", "storageRoot": "0x..." }]
}
```

## Factory event (indexing)

`PropertyShareCreated(propertyId, token, registry, metadataURI, supplyCap)` — see `PropertyShareFactory.sol`.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @title IPropertyShareToken
/// @notice ERC-20 bound to a single PropertyRegistry property. See docs/token-standard.md.
interface IPropertyShareToken is IERC20 {
    /// @notice Emitted when the token is deployed for a property (for indexers).
    event PropertyShareDeployed(
        uint256 indexed propertyId,
        address indexed token,
        address indexed registry,
        string metadataURI,
        uint256 supplyCap
    );

    function propertyId() external view returns (uint256);

    function REGISTRY() external view returns (address);

    function metadataURI() external view returns (string memory);

    function supplyCap() external view returns (uint256);
}

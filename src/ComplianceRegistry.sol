// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IComplianceRegistry} from "./interfaces/IComplianceRegistry.sol";

/// @notice Stores per-wallet KYC status and allowlisted system contracts (router, pairs, pools).
contract ComplianceRegistry is AccessControl, IComplianceRegistry {
    bytes32 public constant COMPLIANCE_ADMIN_ROLE = keccak256("COMPLIANCE_ADMIN_ROLE");

    mapping(address => IComplianceRegistry.Status) public override statusOf;
    mapping(address => bool) public override isSystemContract;

    event WalletStatusChanged(address indexed wallet, IComplianceRegistry.Status status);
    event SystemContractChanged(address indexed account, bool isSystem);

    error ZeroAddress();

    constructor(address admin) {
        if (admin == address(0)) revert ZeroAddress();
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(COMPLIANCE_ADMIN_ROLE, admin);
    }

    /// @notice KYC approved — wallet may hold restricted tokens.
    function setWalletStatus(address wallet, IComplianceRegistry.Status s)
        external
        onlyRole(COMPLIANCE_ADMIN_ROLE)
    {
        statusOf[wallet] = s;
        emit WalletStatusChanged(wallet, s);
    }

    /// @notice Mark DEX router, pair, lending pool, etc. (restricted tokens may flow through these).
    function setSystemContract(address account, bool enabled) external onlyRole(COMPLIANCE_ADMIN_ROLE) {
        isSystemContract[account] = enabled;
        emit SystemContractChanged(account, enabled);
    }

    /// @inheritdoc IComplianceRegistry
    function isVerified(address wallet) external view returns (bool) {
        return statusOf[wallet] == Status.Verified;
    }
}

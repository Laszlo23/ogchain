// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script, console2} from "forge-std/Script.sol";
import {PropertyRegistry} from "../src/PropertyRegistry.sol";
import {PropertyShareFactory} from "../src/PropertyShareFactory.sol";

/// @notice Registers 3 demo parcels and deploys one PropertyShareToken each (testnet demo).
/// @dev Caller must have REGISTRAR_ROLE on PropertyRegistry (deployer from DeployAll does).
contract SeedThreePropertiesScript is Script {
    function run() external {
        uint256 pk = vm.parseUint(vm.envString("PRIVATE_KEY"));
        address deployer = vm.addr(pk);

        address registryAddr = vm.envAddress("PROPERTY_REGISTRY");
        address factoryAddr = vm.envAddress("PROPERTY_SHARE_FACTORY");

        address treasury = deployer;
        if (vm.envExists("TREASURY_ADDRESS")) {
            address t = vm.envAddress("TREASURY_ADDRESS");
            if (t != address(0)) treasury = t;
        }

        PropertyRegistry registry = PropertyRegistry(registryAddr);
        PropertyShareFactory factory = PropertyShareFactory(factoryAddr);

        string[3] memory ids = [
            "DEMO-US-CA-001",
            "DEMO-US-CA-002",
            "DEMO-US-CA-003"
        ];
        string[3] memory symbols = ["DP1", "DP2", "DP3"];

        vm.startBroadcast(pk);

        for (uint256 i; i < 3; ++i) {
            bytes32 externalRef = keccak256(bytes(ids[i]));
            bytes32 metadataHash = keccak256(bytes(string.concat("ogchain:demo:metadata:", ids[i])));
            uint256 propertyId = registry.registerProperty(externalRef, metadataHash, treasury);
            console2.log("Registered", ids[i], "propertyId", propertyId);

            string memory name_ = string.concat("Demo Property ", _toString(i + 1));
            string memory uri = string.concat("https://ogchain.demo/meta/", _toString(i + 1), ".json");

            address token = factory.createPropertyShare(
                propertyId,
                name_,
                symbols[i],
                uri,
                1_000_000 ether,
                treasury,
                100_000 ether,
                treasury
            );
            console2.log("Share token", token);
        }

        vm.stopBroadcast();
    }

    function _toString(uint256 v) internal pure returns (string memory) {
        if (v == 0) return "0";
        uint256 j = v;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        j = len;
        while (v != 0) {
            j--;
            bstr[j] = bytes1(uint8(48 + (v % 10)));
            v /= 10;
        }
        return string(bstr);
    }
}

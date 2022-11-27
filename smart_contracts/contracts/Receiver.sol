//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";
import "./token/UmnToken.sol";
import "./UserTransaction.sol";

contract Receiver is ERC2771Context {
    constructor(
        MinimalForwarder forwarder
    ) ERC2771Context(address(forwarder)) {}

    function processTransaction(
        address[] calldata targets,
        UserTransaction[] calldata txBundle
    ) external returns (bytes[] memory) {
        bytes[] memory results = new bytes[](txBundle.length);

        for (uint i; i < txBundle.length; i++) {
            (, bytes memory result) = targets[i].call(abi.encode(txBundle[i]));
            results[i] = result;
        }

        return results;
    }
}

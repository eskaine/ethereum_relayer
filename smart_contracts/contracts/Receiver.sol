//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/metatx/ERC2771Context.sol';
import '@openzeppelin/contracts/metatx/MinimalForwarder.sol';
import './token/UmnToken.sol';
import '../structs/UserTransaction.sol';
import '../interfaces/ReceiverInterface.sol';

contract Receiver is ERC2771Context, ReceiverInterface {
    address private _umnTokenAddress;

    event TxBundleEvent(Result[] results);

    constructor(
        MinimalForwarder forwarder,
        address umnTokenAddress
    ) ERC2771Context(address(forwarder)) {
        _umnTokenAddress = umnTokenAddress;
    }

    function processTransaction(
        RequestBody[] calldata txBundle
    ) external {
        Result[] memory results;

        for (uint i; i < txBundle.length; i++) {
            RequestBody memory requestBody = txBundle[i];
        }

        emit TxBundleEvent(results);
    }
}

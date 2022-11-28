//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/metatx/ERC2771Context.sol';
import '@openzeppelin/contracts/metatx/MinimalForwarder.sol';
import './token/UmnToken.sol';
import '../structs/UserTransaction.sol';
import '../interfaces/ReceiverInterface.sol';

contract Receiver is ERC2771Context, ReceiverInterface {
    address private _umnTokenAddress;

    event ForwardTransaction(bool[] results);

    constructor(
        MinimalForwarder forwarder,
        address umnTokenAddress
    ) ERC2771Context(address(forwarder)) {
        _umnTokenAddress = umnTokenAddress;
    }

    function processTransaction(
        UserTransaction[] calldata txBundle
    ) external {
        bool[] memory results = new bool[](txBundle.length);

        for (uint i; i < txBundle.length; i++) {
            UmnToken token = UmnToken(_umnTokenAddress);
            bool isSuccessful = token.buy(txBundle[i].user, txBundle[i].amount);

            results[i] = isSuccessful;
        }

        emit ForwardTransaction(results);
    }
}

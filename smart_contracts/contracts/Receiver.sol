//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/metatx/MinimalForwarder.sol';
import '@openzeppelin/contracts/metatx/ERC2771Context.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import './token/UmnToken.sol';

interface IReceiver {
    function processTransaction(
        RequestBody[] calldata txBundle
    ) external payable;
}

struct RequestBody {
    MinimalForwarder.ForwardRequest request;
    bytes signature;
}

struct Result {
    address to;
    bool result;
}

contract Receiver is ERC2771Context, IReceiver {
    address payable public owner;
    address private _umnTokenAddress;
    MinimalForwarder private _forwarder;

    event TxBundleEvent(Result[] results);

    constructor(
        MinimalForwarder forwarder,
        address umnTokenAddress
    ) payable ERC2771Context(address(forwarder)) {
        owner = payable(msg.sender);
        _forwarder = forwarder;
        _umnTokenAddress = umnTokenAddress;
    }

    function processTransaction(
        RequestBody[] calldata txBundle
    ) external payable {
        Result[] memory results = new Result[](txBundle.length);

        for (uint i; i < txBundle.length; i++) {
            RequestBody memory requestBody = txBundle[i];
            (bool result, ) = _forwarder.execute(requestBody.request, requestBody.signature);
            Result memory newResult = Result(requestBody.request.from, result);
            results[i] = newResult;
        }

        emit TxBundleEvent(results);
    }
}

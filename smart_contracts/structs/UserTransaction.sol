//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct Data {
    uint256 amount;
}

struct Request {
    address to;
    address from;
    Data data;
    uint256 value;
    uint256 gas;
    uint256 nonce;
}

struct RequestBody {
    Request request;
}

struct Result {
    address to;
    bool result;
}

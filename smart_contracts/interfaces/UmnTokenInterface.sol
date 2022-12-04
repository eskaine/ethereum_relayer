//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface UmnTokenInterface {
    function buy(uint256) external;
    function getBalance(address) external view returns (uint256);
}

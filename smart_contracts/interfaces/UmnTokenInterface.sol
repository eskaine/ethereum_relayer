//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface UmnTokenInterface {
    function buy(address, uint256) external returns (bool);
    function getBalance(address) external view returns (uint256);
}

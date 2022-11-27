//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../structs/UserTransaction.sol";

interface ReceiverInterface {
    function processTransaction(
        UserTransaction[] calldata txBundle
    ) external returns (bool[] memory);
}

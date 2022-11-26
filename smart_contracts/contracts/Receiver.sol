//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import "@openzeppelin/contracts/metatx/MinimalForwarder.sol";

contract Receiver is ERC2771Context {
    constructor(MinimalForwarder forwarder)
        ERC2771Context(address(forwarder)) {
    }
}

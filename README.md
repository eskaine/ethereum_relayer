# Ethereum Relayer

Ethereum Relayer Service which consolidates multiple user submitted transactions in one meta-transaction.

## Assignment Takeaway

### Overall Status

The overall service is partially working. While transactions can be send and received, the meta-transaction is not properly sended to the receiver and further relayed to the target smart contracts.

Deployed & Running : 
- Relayer Service
    - Handled by OpenZeppelin Autotask.
- On-chain Receiver Smart Contract
    - [Target Contract Etherscan](https://goerli.etherscan.io/address/0xFa4a5B6ADD649eD99c00Cd60Cb5f82978cd018C7)
    - [Forwarder Etherscan](https://goerli.etherscan.io/address/0xfBA27a16e83d104d9739b2DB3D82Dd8E43047ffC)
    - [Receiver Etherscan](https://goerli.etherscan.io/address/0x571051e5469C7BD17D7d72bD619AD5be6F3cc5F3)

### Key Challenges

1) How to construct the relayer service and figuring how to batch incoming transactions into a single meta-transaction within every X seconds.

    Possible solutions:
    - Event-Driven Architecture

2) Creating a receiver smart contract which takes in a meta-transaction and forwarding to the target smart contract.

## Overview

A frontend client will submit a user-signed EIP712 transaction explicitly with an EIP712 compatible wallet such as Metamask to a relayer service. Transaction will target an ERC20-based smart contract.

The relayer service will validate the submmitted transactions as well as batching the transactions into a single meta-transaction in a given time duration which will be send to an on-chain receiver smart contract.

The on-chain receiver smart contract will then relay the batched transactions to their respective target smart contracts.

## Assignment Structure

This assignment is broken down into 3 standalone projects.

- React Frontend (client)
- Relayer Service (relayer_api)
- On-chain Receiver Smart Contract (smart_contracts)

## TechStack

### React Frontend
- React
- Ethers
- TypeScript
- Axios

### Relayer Service
- Ethers
- TypeScript
- OpenZeppelin Relayer
- OpenZeppelin Autotask

### On-chain Receiver Smart Contract
- Ethers
- TypeScript
- Hardhat
- OpenZeppelin Contracts
- OpenZeppelin Relayer

## Running the Service

### Steps

1) Open terminal
2) Clone this repository
```
git clone <this repo link>
```
3) Go to the following path 

```
cd ethereum_relayer/client 
```
4) Run npm install
```
npm i
```
5) Run npm start
```
npm start
```



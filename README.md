# Ethereum Relayer

Ethereum Relayer Service which consolidates multiple user submitted transactions in one meta-transaction.

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

### Relayer Service

The relayer service will be handled by OpenZeppelin Autotask.

### On-chain Receiver Smart Contract

The below are the required smart contracts which have been deployed to the Goerli testnet.

- [Target Contract Etherscan](https://goerli.etherscan.io/address/0x746D6C3DF1f0e75edf235f78942aA017F754aC36)
- [Forwarder Etherscan](https://goerli.etherscan.io/address/0x365Ef88FAD67B21684E83658545078270B7ac5b3)
- [Receiver Etherscan](https://goerli.etherscan.io/address/0x208102a393359d6f7962ecdd2775b2742450cb07)

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



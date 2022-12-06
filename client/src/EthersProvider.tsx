import { ReactElement, createContext, useState } from "react";
import PropTypes from "prop-types";
import { ethers, Contract } from "ethers";
import axios from 'axios';
import { eip712Transaction } from "./utils/baseMetatx";
import { EthersContextInterface } from "./interfaces/ethersContext";
import { RequestParams } from "./interfaces/request";
import { JsonRpcSigner, Web3Provider } from "./types/ethers.type";
import { umnTokenAddress, forwarderAddress, goerliEndpoint } from "./utils/constants";
import { umnTokenAbi } from "./abis/umnToken.abi";
import { forwarderAbi } from "./abis/forwarder.abi";

const EthersContext = createContext<EthersContextInterface | null>(null);

const EthersProvider = ({ children }: { children: ReactElement }) => {
  const [account, setAccount] = useState('');
  const [userProvider, setUserProvider] = useState<Web3Provider | null>(null);

  // OpenZeppelin autotask serving as relayer service
  const relayerServiceUrl = process.env.REACT_APP_AUTOTASK_WEBHOOK_URL ?? '';

  // Connect to metamask
  async function connectWallet() {
    if (window.ethereum) {
      const userProvider = new ethers.providers.Web3Provider(window.ethereum);
      const [account] = await userProvider.send("eth_requestAccounts", []);
      setAccount(account);
      setUserProvider(userProvider);

      return account;
    } else {
      throw new Error('Please install metamask');
    }
  }

  async function sendTransaction(amount: number) {
    if (amount <= 0) throw new Error(`Amount cannot be empty`);
    if (!window.ethereum) throw new Error(`User wallet not found`);
    if (relayerServiceUrl === '') throw new Error('Relayer Service not available');

    // Get target contract
    const goerliProvider = new ethers.providers.JsonRpcProvider(goerliEndpoint, 5); 
    const umnTokenContract = new ethers.Contract(umnTokenAddress, umnTokenAbi, goerliProvider);

    const to = umnTokenContract.address;
    const data = umnTokenContract.interface.encodeFunctionData('buy', [amount]);

    const userProvider = new ethers.providers.Web3Provider(window.ethereum);
    const userNetwork = await userProvider.getNetwork();
    if (userNetwork.chainId !== 5) throw new Error(`Please switch to Goerli for signing`);

    const signer = userProvider.getSigner();
    const from = await signer.getAddress();

    // Target contract forwarder
    const forwarder = new ethers.Contract(forwarderAddress, forwarderAbi, goerliProvider);
    const request = await getSignedMetaRequest(signer, forwarder, { to, from, data });

    const axiosConfig = { headers: { 'Content-Type': 'application/json' } };
    return axios.post(relayerServiceUrl, JSON.stringify(request),  axiosConfig);
  }

  function getAccount() {
    return account;
  }

  function createBaseTransaction(chainId: number, verifyingContract: string) {
    return {
      ...eip712Transaction,
      domain: {
        name: "MinimalForwarder",
        version: "0.0.1",
        chainId,
        verifyingContract,
      },
    };
  }

  // Goal - User to sign EIP712 transaction
  async function getSignedMetaRequest(signer: JsonRpcSigner, forwarder: Contract, requestParams: RequestParams) {

    const request = { value: 0, gas: 1e6, nonce: 0, ...requestParams };
    const chainId = await forwarder.provider.getNetwork().then((n) => n.chainId);

    // Create EIP712 transaction
    const metaTx = {
      ...createBaseTransaction(chainId, forwarder.address),
      message: request,
    };

    const [method, argData] =  ['eth_signTypedData_v4', JSON.stringify(metaTx)];
    const signature = await signer.provider.send(method, [requestParams.from, argData]);

    return { signature, request };
  }

  const state: EthersContextInterface = {
    connectWallet,
    sendTransaction,
    getAccount
  };

  return (
    <EthersContext.Provider value={state}>{children}</EthersContext.Provider>
  );
};

EthersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EthersProvider, EthersContext };

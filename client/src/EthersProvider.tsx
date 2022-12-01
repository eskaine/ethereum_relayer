import React, { ReactElement } from "react";
import PropTypes from "prop-types";
import { BigNumber, ethers } from "ethers";
import { eip712Transaction } from "./utils/baseMetatx";
import { EthersContextInterface } from "./interfaces/ethersContext";
import { RequestParams } from "./interfaces/request";
import { JsonRpcSigner } from "./types/ethers.type";
import { MinimalForwarder} from './typechain-types/@openzeppelin/contracts/metatx/MinimalForwarder'

const EthersContext = React.createContext<EthersContextInterface | null>(null);

const EthersProvider = ({ children }: { children: ReactElement }) => {
  // OpenZeppelin autotask serving as relayer service
  const relayerServiceUrl = process.env.REACT_APP_AUTOTASK_WEBHOOK_URL;

  async function connectWallet() {
    if (window.ethereum) {
      const userProvider = new ethers.providers.Web3Provider(window.ethereum);
      await userProvider.send("eth_requestAccounts", []);
      const signer = userProvider.getSigner();

      return signer;
    }

    return null;
  }

  function createBaseTransaction(chainId: number, verifyingContract: string) {
    return {
      ...eip712Transaction,
      domain: {
        name: "UMN Transaction",
        version: "",
        chainId,
        verifyingContract,
        salt: "",
      },
    };
  }

  async function getSignedMetaRequest(signer: JsonRpcSigner, forwarder: MinimalForwarder, requestParams: RequestParams) {
    const nonce = await forwarder.getNonce(requestParams.from).then((nonce: BigNumber) => nonce.toString());
    const request = { value: 0, gas: 1e6, nonce, ...requestParams };
    const chainId = await forwarder.provider.getNetwork().then((n) => n.chainId);

    const metaTx = {
      ...createBaseTransaction(chainId, forwarder.address),
      message: request,
    };

    const [method, argData] = ["eth_signTypedData_v4", JSON.stringify(metaTx)]
    const signature = await signer.provider.send(method, [requestParams.from, argData]);

    return { signature, request };
  }

  const state: EthersContextInterface = {
    connectWallet,
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

import React, { ReactElement, Context } from "react";
import PropTypes from "prop-types";
import { ethers } from "ethers";
import { EthersContextInterface } from "./interfaces/ethersContext";
import { eip712Transaction } from "./contractTypes/userTransactionType";

const EthersContext  = React.createContext<EthersContextInterface | null>(null);

const EthersProvider = ({ children }: { children: ReactElement }) => {
  async function connectWallet() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      return signer;
    }

    return null;
  }

  function sendTransaction(address: string, amount: number) {
    const transaction = JSON.stringify({
        ...createBaseTransaction(),
        message: {
            address,
            amount
        }
    });
  }

  function createBaseTransaction() {
    const domain = {
        name: "UMN Transaction",
        version: "",
        chainId: 0,
        verifyingContract: "",
        salt: ""
    };

    return {
        ...eip712Transaction,
        domain,
        primaryType: "Buy",
    };
  } 

  const state: EthersContextInterface = {
    connectWallet 
  }

  return (
    <EthersContext.Provider value={state}>
      {children}
     </EthersContext.Provider>
  );
};

EthersProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { EthersProvider, EthersContext };

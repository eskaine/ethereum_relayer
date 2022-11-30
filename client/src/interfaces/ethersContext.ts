import { ethers } from "ethers";

type ConnectWalletFunction = () => Promise<ethers.providers.JsonRpcSigner | null> | null;

export interface EthersContextInterface {
    connectWallet: ConnectWalletFunction;
}

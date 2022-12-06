import { AxiosResponse } from "axios";

type ConnectWalletFunction = () => Promise<string>;
type SendTransactionFunction = (amount: number) => Promise<AxiosResponse>;
type GetAccountFunction = () => string;

export interface EthersContextInterface {
    getAccount: GetAccountFunction;
    connectWallet: ConnectWalletFunction;
    sendTransaction: SendTransactionFunction;
}

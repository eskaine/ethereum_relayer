import { BigNumber } from "ethers";

export interface RequestParams {
    to: string;
    from: string;
    amount: BigNumber;
}

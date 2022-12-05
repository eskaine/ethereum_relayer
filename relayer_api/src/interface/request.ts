import { Bytes } from "ethers";

interface Request {
    to: string;
    from: string;
    data: Bytes;
    value: number;
    gas: number;
    nonce: any;
}

export interface RequestBody {
    request: Request;
    signature: string;
}

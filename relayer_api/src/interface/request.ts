interface Data {
    amount: string;
}

interface Request {
    to: string;
    from: string;
    data: Data;
    value: number;
    gas: number;
    nonce: any;
}

export interface RequestBody {
    request: Request;
    signature: any;
}

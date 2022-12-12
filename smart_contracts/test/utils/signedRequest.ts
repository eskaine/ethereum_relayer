import { ethers, Contract } from "ethers";

type JsonRpcSigner = ethers.providers.JsonRpcSigner;

interface RequestParams {
    to: string;
    from: string;
    data: string;
}

const EIP712Domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
];

const ForwardRequest = [
  { name: "from", type: "address" },
  { name: "to", type: "address" },
  { name: "value", type: "uint256" },
  { name: "gas", type: "uint256" },
  { name: "nonce", type: "uint256" },
  { name: "data", type: "bytes" },
];

export async function getSignedMetaRequest(
  signer: JsonRpcSigner,
  forwarder: Contract,
  requestParams: RequestParams
) {
  const request = { value: 0, gas: 1e6, nonce: 0, ...requestParams };
  const chainId = await forwarder.provider.getNetwork().then((n) => n.chainId);

  const metaTx = {
    types: {
      EIP712Domain,
      ForwardRequest,
    },
    primaryType: "ForwardRequest",
    domain: {
      name: "MinimalForwarder",
      version: "0.0.1",
      chainId,
      verifyingContract: forwarder.address,
    },
    message: request,
  };

  const [method, argData] = ["eth_signTypedData_v4", JSON.stringify(metaTx)];
  const signature = await signer.provider.send(method, [
    requestParams.from,
    argData,
  ]);

  return { signature, request };
}

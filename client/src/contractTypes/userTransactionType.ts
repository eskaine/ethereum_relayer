const domain = [
  { name: "name", type: "string" },
  { name: "version", type: "string" },
  { name: "chainId", type: "uint256" },
  { name: "verifyingContract", type: "address" },
  { name: "salt", type: "bytes32" },
];

const userTransaction = [
    { user: "address", amount: "uint256" }
];

export const eip712Transaction = {
    types: {
        EIP712Domain: domain,
        UserTransaction: userTransaction
    },
};

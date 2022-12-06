export const receiverAbi = [
  {
    "inputs": [
      {
        "internalType": "contract MinimalForwarder",
        "name": "forwarder",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "umnTokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "result",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct Result[]",
        "name": "results",
        "type": "tuple[]"
      }
    ],
    "name": "TxBundleEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "forwarder",
        "type": "address"
      }
    ],
    "name": "isTrustedForwarder",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "from",
                "type": "address"
              },
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "gas",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "internalType": "struct MinimalForwarder.ForwardRequest",
            "name": "request",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct RequestBody[]",
        "name": "txBundle",
        "type": "tuple[]"
      }
    ],
    "name": "processTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
  
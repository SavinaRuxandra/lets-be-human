export const TRANSFER_CONTRACT_ADDRESS = '0x20f9377761626Ae243118321CdF5fb35E36945E7';
export const TRANSFER_TOKEN_ABI = [
  {
    "inputs": [],
    "stateMutability": "payable",
    "type": "constructor",
    "payable": true
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "DonationEvent",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "message",
        "type": "string"
      },
      {
        "internalType": "uint64",
        "name": "postId",
        "type": "uint64"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getDonations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "accountSender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "accountReceiver",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint64",
            "name": "postId",
            "type": "uint64"
          },
          {
            "internalType": "string",
            "name": "message",
            "type": "string"
          }
        ],
        "internalType": "struct Transfers.Donation[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];

export const DONOR_CONTRACT_ADDRESS = '0xBbDb0D380Da5Cf5aaAF1D5e8532e879A2968754C';
export const DONOR_TOKEN_ABI= [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      }
    ],
    "name": "getDonorUsername",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "username",
        "type": "string"
      }
    ],
    "name": "setDonorUsername",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const CHARITY_ORGANIZATIONS_CONTRACT_ADDRESS = '0xB1B7AFFAdbE32efbF8752EA7758eF4f613cE306C';
export const CHARITY_ORGANIZATIONS_TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      }
    ],
    "name": "addCharityOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "phoneNumber",
        "type": "string"
      }
    ],
    "name": "updateCharityOrganization",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "accountAddress",
        "type": "address"
      }
    ],
    "name": "getCharityOrganizationByAddress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "accountAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CharityOrganizations.CharityOrganization",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllCharityOrganizations",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "accountAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "email",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "phoneNumber",
            "type": "string"
          }
        ],
        "internalType": "struct CharityOrganizations.CharityOrganization[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]

export const POSTS_CONTRACT_ADDRESS = '0x04c4321857B8697C8e9Da398464A941A2a4B0e80';
export const POSTS_TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "charityOrganizationAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "headline",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "readMoreUrl",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "photos",
        "type": "string[]"
      }
    ],
    "name": "addPost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "charityOrganizationAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "headline",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "readMoreUrl",
        "type": "string"
      },
      {
        "internalType": "string[]",
        "name": "photos",
        "type": "string[]"
      }
    ],
    "name": "updatePost",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "deletePostById",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "getPostById",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "charityOrganizationAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "headline",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "readMoreUrl",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "photos",
            "type": "string[]"
          },
          {
            "internalType": "bool",
            "name": "deleted",
            "type": "bool"
          }
        ],
        "internalType": "struct Posts.Post",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getAllPosts",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "charityOrganizationAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "headline",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "readMoreUrl",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "photos",
            "type": "string[]"
          },
          {
            "internalType": "bool",
            "name": "deleted",
            "type": "bool"
          }
        ],
        "internalType": "struct Posts.Post[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]
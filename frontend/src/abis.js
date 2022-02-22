export const TRANSFER_CONTRACT_ADDRESS = '0xd752BcAe9a0BE409a0Ca1f51b276383B6E20456d';
export const TRANSFER_TOKEN_ABI = [
    {
        "inputs": [],
        "stateMutability": "payable",
        "type": "constructor",
        "payable": true
      },
      {
        "inputs": [
          {
            "internalType": "address payable",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "pay",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
      }
]
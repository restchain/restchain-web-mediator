import Web3 from "web3";

export const signerPrivateKey = '7467e3c4b53bd34e166c37424933558e359ac191bb2275c4d02bbc4479b27375'
export const mumbai_net = 'https://rpc-mumbai.maticvigil.com/'

export const restchainABI = [
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "id",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "callbackFn",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "restApiUri",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "fnType",
                "type": "string"
            }
        ],
        "name": "callRESTMethod",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "calledREST",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "functionDone",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "stateChanged",
        "type": "event"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "delivery_response_rcbkid",
                "type": "string"
            }
        ],
        "name": "Message_0474lw1",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "order_rcid",
                "type": "string"
            }
        ],
        "name": "Message_076o1kd",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "order_detail_rcbkid",
                "type": "string"
            }
        ],
        "name": "Message_07mqvrh",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "delivery_request_rcid",
                "type": "string"
            }
        ],
        "name": "Message_09bjhm3",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "delivery_schedule_rcid",
                "type": "string"
            }
        ],
        "name": "Message_0b4l2zh",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Message_0b4l2zh_resp",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "accept_confirmation_rcbkid",
                "type": "string"
            }
        ],
        "name": "Message_0d3aney",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "confirmation_rcid",
                "type": "string"
            }
        ],
        "name": "Message_0lj7ivw",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "order_bill_rcid",
                "type": "string"
            }
        ],
        "name": "Message_0uwf7hc",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Message_0uwf7hc_resp",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "acceptance_rcid",
                "type": "string"
            }
        ],
        "name": "Message_1219hp4",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "delivery_plan_rcid",
                "type": "string"
            }
        ],
        "name": "Message_1eeokvp",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "Message_1eeokvp_resp",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "return_acceptance_rcbkid",
                "type": "string"
            }
        ],
        "name": "Message_1godtlj",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "confirm_payment_rcbkid",
                "type": "string"
            }
        ],
        "name": "Message_1l9kuwf",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "payment_receipt_rcid",
                "type": "string"
            }
        ],
        "name": "Message_1u8zceq",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getCurrentState",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "ID",
                        "type": "string"
                    },
                    {
                        "internalType": "enum riprova2.State",
                        "name": "status",
                        "type": "uint8"
                    }
                ],
                "internalType": "struct riprova2.Element[]",
                "name": "",
                "type": "tuple[]"
            },
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "delivery_schedule_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "accept_confirmation_rcbkid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "order_bill_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "order_detail_rcbkid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "delivery_response_rcbkid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "order_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "delivery_plan_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "return_acceptance_rcbkid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "payment_receipt_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "confirmation_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "confirm_payment_rcbkid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "delivery_request_rcid",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "acceptance_rcid",
                        "type": "string"
                    }
                ],
                "internalType": "struct riprova2.StateMemory",
                "name": "",
                "type": "tuple"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address payable",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "_role",
                "type": "string"
            }
        ],
        "name": "subscribe_as_participant",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
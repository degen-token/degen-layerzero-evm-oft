import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import contractsConfig from './contracts.json'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASE_V2_MAINNET,
    contractName: 'OrbitERC20OFTAdapter',
}

const ethereumContract: OmniPointHardhat = {
    eid: EndpointId.ETHEREUM_V2_MAINNET,
    contractName: 'DEGENOFT',
}

const arbitrumContract: OmniPointHardhat = {
    eid: EndpointId.ARBITRUM_V2_MAINNET,
    contractName: 'DEGENOFT',
}

const degenContract: OmniPointHardhat = {
    eid: EndpointId.DEGEN_V2_MAINNET,
    contractName: 'OrbitNativeOFTAdapter',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: baseContract,
        },
        {
            contract: ethereumContract,
        },
        {
            contract: arbitrumContract,
        },
        {
            contract: degenContract,
        },
    ],
    connections: [
        // base <-> ethereum
        {
            from: baseContract,
            to: ethereumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.deutscheTelekom,
                            contractsConfig.base.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.deutscheTelekom,
                            contractsConfig.base.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: ethereumContract,
            to: baseContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.deutscheTelekom,
                            contractsConfig.ethereum.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.deutscheTelekom,
                            contractsConfig.ethereum.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        // base <-> arbitrum
        {
            from: baseContract,
            to: arbitrumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.deutscheTelekom,
                            contractsConfig.base.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.deutscheTelekom,
                            contractsConfig.base.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: arbitrumContract,
            to: baseContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.deutscheTelekom,
                            contractsConfig.arbitrum.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.deutscheTelekom,
                            contractsConfig.arbitrum.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        // base <-> degen
        {
            from: baseContract,
            to: degenContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.horizen,
                            contractsConfig.base.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.base.canary,
                            contractsConfig.base.horizen,
                            contractsConfig.base.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: degenContract,
            to: baseContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        // ethereum <-> arbitrum
        {
            from: ethereumContract,
            to: arbitrumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.deutscheTelekom,
                            contractsConfig.ethereum.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.deutscheTelekom,
                            contractsConfig.ethereum.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: arbitrumContract,
            to: ethereumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.deutscheTelekom,
                            contractsConfig.arbitrum.horizen,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.deutscheTelekom,
                            contractsConfig.arbitrum.horizen,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        // ethereum <-> degen
        {
            from: ethereumContract,
            to: degenContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.horizen,
                            contractsConfig.ethereum.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.ethereum.canary,
                            contractsConfig.ethereum.horizen,
                            contractsConfig.ethereum.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: degenContract,
            to: ethereumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(15),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 100000,
                        value: 0,
                    },
                ],
            },
        },
        // arbitrum <-> degen
        {
            from: arbitrumContract,
            to: degenContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.horizen,
                            contractsConfig.arbitrum.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.arbitrum.canary,
                            contractsConfig.arbitrum.horizen,
                            contractsConfig.arbitrum.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: degenContract,
            to: arbitrumContract,
            config: {
                sendConfig: {
                    ulnConfig: {
                        confirmations: BigInt(21),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(20),
                        requiredDVNs: [
                            contractsConfig.degen.canary,
                            contractsConfig.degen.horizen,
                            contractsConfig.degen.nethermind,
                        ],
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 0,
                    },
                ],
            },
        },
    ],
}

export default config

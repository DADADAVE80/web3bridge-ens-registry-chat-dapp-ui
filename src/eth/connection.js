import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId
const projectId = process.env.WALLET_CONNECT_PROJECT_ID;

// 2. Set chains
const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://rpc.sepolia.org'
}

// 3. Create a metadata object
const metadata = {
    name: 'Gasless Meta Transactions',
    description: 'A simple example of how to use gasless meta transactions with Sepolia.',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: '...', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
});

export const configureWeb3Modal = () =>
    // 5. Create a Web3Modal instance
    createWeb3Modal({
        ethersConfig,
        chains: [sepolia],
        projectId,
        enableAnalytics: true // Optional - defaults to your Cloud configuration
    });
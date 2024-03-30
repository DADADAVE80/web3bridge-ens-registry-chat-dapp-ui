/* eslint-disable no-unused-vars */
import { ethers } from 'ethers';

const CLOUDFLARE_ENDPOINT = 'https://sepolia.prylabs.net';
const MAIN_ENDPOINT = 'https://ethereum-sepolia.publicnode.com';
const ALTERNATE_ENDPOINT = 'https://gateway.tenderly.co/public/sepolia';
const UNSECURE_ENDPOINT = 'http://sepolia.blockscout.com';
const QUICKNODE_ENDPOINT = process.env.REACT_APP_QUICKNODE_URL;
const ALCHEMY_SEPOLIA_RPC_URL = process.env.REACT_APP_ALCHEMY_SEPOLIA_RPC_URL;

export function createProvider() {
  return new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_RPC_URL || MAIN_ENDPOINT || CLOUDFLARE_ENDPOINT || ALTERNATE_ENDPOINT || UNSECURE_ENDPOINT, 11155111);
}
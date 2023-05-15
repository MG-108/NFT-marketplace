import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { INFTContext } from '../types/NFT';
import { MarketAddress, MarketAddressABI } from './constants';
import validateEnv from '../utils/validateEnv';

const projectSubdomain = validateEnv(
  'IPFS Project Subdomain',
  process.env.NEXT_PUBLIC_IPFS_SUBDOMAIN
);

const projectId = validateEnv(
  'IPFS Project Id',
  process.env.NEXT_PUBLIC_IPFS_API_KEY
);

const projectSecret = validateEnv(
  'IPFS Project API secret key',
  process.env.NEXT_PUBLIC_IPFS_PROJECT_API_SECRET
);

const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString(
  'base64'
)}`;

const client = ipfsHttpClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

export const NFTContext = React.createContext<INFTContext>({} as INFTContext);

export const NFTProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const nftCurrency = 'MATIC';

  const checkIfWalletIsConnected = async () => {
    // check if the user has metamask installed
    if (!window.ethereum) return alert('Please install metamask');

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });

    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log('No accounts found');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) return alert('Please install metamask');

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    setCurrentAccount(accounts[0]);

    // reload the current page
    window.location.reload();
  };

  const updloadToIPFS = async (file: File) => {
    try {
      const added = await client.add({ content: file });

      const url = `${projectSubdomain}/ipfs/${added.path}`;

      return url;
    } catch (error) {
      console.log('Error uploading file to IPFS');
    }
  };

  return (
    <NFTContext.Provider
      value={{ nftCurrency, connectWallet, currentAccount, updloadToIPFS }}
    >
      {children}
    </NFTContext.Provider>
  );
};

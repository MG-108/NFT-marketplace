import React, { useState, useEffect } from 'react';
import { NextRouter } from 'next/router';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import {
  INFTContext,
  IFormInput,
  IFormattedNFT,
  IRawNFTData,
  INFTMetadata,
} from '../types/NFT';
import { client } from '../services/IPFSConfig';
import validateEnv from '../utils/validateEnv';
import { MarketAddress, MarketAddressABI } from './constants';

const projectSubdomain = validateEnv(
  'IPFS Project Subdomain',
  process.env.NEXT_PUBLIC_IPFS_SUBDOMAIN
);

const fetchContract = (
  signerOrProvider:
    | ethers.providers.JsonRpcSigner
    | ethers.providers.JsonRpcProvider
): ethers.Contract =>
  new ethers.Contract(MarketAddress, MarketAddressABI, signerOrProvider);

export const NFTContext = React.createContext<INFTContext>({} as INFTContext);

export const NFTProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const nftCurrency = 'ETH';

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

  const createNft = async (
    formInput: IFormInput,
    fileUrl: string,
    router: NextRouter
  ) => {
    const { name, description, price } = formInput;

    if (!name || !description || !price || !fileUrl) return;

    const data = JSON.stringify({ name, description, image: fileUrl });

    try {
      const added = await client.add(data);

      const url = `${projectSubdomain}/ipfs/${added.path}`;

      await createSale(url, price);

      router.push('/');
    } catch (error) {
      console.log('Error uploading file to IPFS');
      console.log(error);
    }
  };

  const createSale = async (
    url: string,
    formInputPrice: string,
    isReselling,
    id
  ) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const price = ethers.utils.parseUnits(formInputPrice, 'ether');
    const contract = fetchContract(signer);
    const listingPrice = await contract.getListingPrice();

    const transaction = await contract.createToken(url, price, {
      value: listingPrice.toString(),
    });

    await transaction.wait();
  };

  const fetchNFTs = async (): Promise<IFormattedNFT[]> => {
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = fetchContract(provider);

    const data = await contract.fetchMarketItems();

    const items = await Promise.all(
      (data as IRawNFTData[]).map(
        async ({ tokenId, seller, owner, price: unformattedPrice }) => {
          const tokenURI = await contract.tokenURI(tokenId);

          const {
            data: { image, name, description },
          } = await axios.get<INFTMetadata>(tokenURI);

          const price = ethers.utils.formatUnits(
            unformattedPrice.toString(),
            'ether'
          );

          return {
            price,
            tokenId: tokenId.toNumber(),
            seller,
            owner,
            image,
            name,
            description,
            tokenURI,
          };
        }
      )
    );

    return items;
  };

  return (
    <NFTContext.Provider
      value={{
        nftCurrency,
        connectWallet,
        currentAccount,
        updloadToIPFS,
        createNft,
        createSale,
        fetchNFTs,
      }}
    >
      {children}
    </NFTContext.Provider>
  );
};

/* eslint-disable no-unused-vars */
import { BigNumber, ethers } from 'ethers';
import { NextRouter } from 'next/router';

export interface IFormInput {
  name: string;
  description: string;
  price: string;
}

export interface IRawNFTData {
  tokenId: ethers.BigNumber;
  seller: string;
  owner: string;
  price: ethers.BigNumber;
}

export interface INFTMetadata {
  image: string;
  name: string;
  description: string;
}

export interface IFormattedNFT {
  price: string;
  tokenId: number;
  seller: string;
  owner: string;
  image: string;
  name: string;
  description: string;
  tokenURI: string;
}

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  updloadToIPFS: (file: File) => Promise<string | undefined>;
  createNft: (
    formInput: IFormInput,
    fileUrl: string,
    router: NextRouter
  ) => Promise<void>;
  createSale: (
    url: string,
    formInputPrice: string,
    isReselling: any,
    id: any
  ) => Promise<void>;
  fetchNFTs: () => Promise<IFormattedNFT[]>;
  fetchMyNFTsOrListedNFTs: (
    type: 'fetchItemsListed' | 'fetchMyNFTs'
  ) => Promise<IFormattedNFT[]>;
}

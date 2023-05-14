import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';

import { MarketAddress, MarketAddressABI } from './constants';
import { INFTContext } from '../types/NFT';

export const NFTContext = React.createContext<INFTContext>({} as INFTContext);

export const NFTProvider = ({ children }: { children: React.ReactNode }) => {
  const nftCurrency = 'MATIC';

  return (
    <NFTContext.Provider value={{ nftCurrency }}>
      {children}
    </NFTContext.Provider>
  );
};

export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
}

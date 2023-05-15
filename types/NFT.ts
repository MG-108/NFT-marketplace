export interface INFTContext {
  nftCurrency: string;
  connectWallet: () => Promise<void>;
  currentAccount: string;
  updloadToIPFS: (file: File) => Promise<string | undefined>;
}

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
}

export interface IFormInput {
  name: string;
  description: string;
  price: string;
}

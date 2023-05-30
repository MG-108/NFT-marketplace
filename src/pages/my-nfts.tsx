import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';

import { NFTContext } from '../../context/NFTContext';
import { HeadingText, Loader, NFTCard, Banner } from '../../components';
import { IFormattedNFT, INFTContext } from '../../types/NFT';

import images from '../../assets';
import { shortenAddress } from '../../utils/shortenAddress';

type MyNFTsProps = {};

const MyNFTs: React.FC<MyNFTsProps> = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } =
    useContext<INFTContext>(NFTContext);
  const [nfts, setNfts] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start">
      <div className="flexCenter w-full flex-col">
        <Banner
          text="Yor Nifty NFT"
          parentStyles="h-80 justify-center"
          childStyles="text-center mb-4"
        />

        <div className="flexCenter z-0 -mt-20 flex-col">
          <div className="flexCenter h-40 w-40 rounded-full bg-nft-black-2 p-1 sm:h-36 sm:w-36">
            <Image
              src={images.creator1}
              alt="creator"
              className="rounded-full object-cover"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="mt-6 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white">
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length ? (
        <div className="flexCenter p-16 sm:p-4 ">
          <HeadingText
            classStyles="text-3xl font-extrabold"
            text="No NFTs Owned"
          />
        </div>
      ) : (
        <div className="mingmd:w-4/5 flexCenter w-full flex-col p-12 sm:px-4">
          <div className="flex w-full flex-1 flex-row px-4 sm:flex-col xs:px-0 minlg:px-8">
            SeachBar
          </div>
          <div className="mt-3 flex w-full flex-wrap">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default MyNFTs;

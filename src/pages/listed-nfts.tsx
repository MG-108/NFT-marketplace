import { useState, useEffect, useContext } from 'react';

import { NFTContext } from '../../context/NFTContext';
import { HeadingText, Loader, NFTCard } from '../../components';
import { IFormattedNFT, INFTContext } from '../../types/NFT';

type Props = {};

const ListedNfts: React.FC<Props> = () => {
  const { fetchMyNFTsOrListedNFTs } = useContext<INFTContext>(NFTContext);
  const [nfts, setNfts] = useState<IFormattedNFT[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('fetchItemsListed').then((items) => {
      setNfts(items);
      setIsloading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter min-h-screen p-16 sm:p-4">
        <HeadingText
          text="No NFTs Listed for Sale"
          classStyles="font-extrabold text-3xl"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center p-12 sm:px-4">
      <div className="w-full minmd:w-4/5">
        <div className="mt-4">
          <HeadingText
            tag="h2"
            text="NFTs Listed for Sale"
            classStyles="mt-2 ml-4 sm:ml-2"
          />
          <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ListedNfts;

import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { NFTContext } from '../../context/NFTContext';
import {
  HeadingText,
  Loader,
  NFTCard,
  Button,
  ParagraphText,
  Modal,
  PaymentBodyCmp,
} from '../../components';
import { IFormattedNFTQuery, INFTContext } from '../../types/NFT';

import images from '../../assets';
import { shortenAddress } from '../../utils/shortenAddress';

type NFTDetailsProps = {};

const NFTDetails: React.FC<NFTDetailsProps> = () => {
  const { currentAccount, nftCurrency } = useContext<INFTContext>(NFTContext);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nft, setNft] = useState<IFormattedNFTQuery>({
    image: '',
    tokenId: '',
    name: '',
    owner: '',
    price: '',
    seller: '',
    description: '',
    tokenURI: '',
  });

  useEffect(() => {
    if (!router.isReady) return;

    setNft(router.query as unknown as IFormattedNFTQuery);

    setIsLoading(false);
  }, [router.isReady]);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  console.log(nft);
  return (
    <div className="relative flex min-h-screen justify-center md:flex-col">
      {/* NFT IMAGE */}
      <div className="flexCenter relative flex-1 border-r border-nft-gray-1 p-12 dark:border-nft-black-1 md:border-b md:border-r-0 sm:px-4">
        <div className="relative h-557 w-557  sm:h-300 sm:w-full minmd:h-2/3 minmd:w-2/3">
          <Image
            src={nft.image}
            fill
            className="rounded-xl shadow-lg"
            alt="NFT"
          />
        </div>
      </div>

      {/* NFT NAME */}
      <div className="flex-1 justify-start p-12 sm:px-4 sm:pb-4">
        <div className="flex flex-row sm:flex-col">
          <HeadingText text={nft.name} />
        </div>

        {/* CREATOR NAME, IMAGE AND ADDRESS */}
        <div className="mt-10">
          <ParagraphText
            text="Creator"
            classStyles="minlg:text-base text-xs font-normal"
          />

          <div className="mt-3 flex flex-row items-center">
            <div className="minglg:w-20 relative mr-2 h-12 w-12 minlg:h-20">
              <Image
                src={images.creator1}
                alt="NFT creator"
                style={{ objectFit: 'cover' }}
                className="rounded-full"
              />
            </div>
            <ParagraphText
              text={shortenAddress(nft.seller)}
              classStyles="minlg:text-base text-xs font-normal"
            />
          </div>
        </div>

        {/* NFT DESCRIPTION */}
        <div className="mt-10 flex flex-col ">
          <div className=" flex w-full flex-row border-b border-nft-gray-1 dark:border-nft-black-1">
            <ParagraphText
              text="Details"
              classStyles="font-medium text-base mb-2"
            />
          </div>

          <div className="mt-3">
            <ParagraphText text={nft.description} />
          </div>
        </div>

        {/* BTN TO BUY NFT */}
        <div className="mt-10 flex flex-row sm:flex-col">
          {currentAccount === nft.seller.toLowerCase() ? (
            <ParagraphText
              text="You cannot but your own NFT"
              classStyles="font-medium text-base border border-gray-2 p-2"
            />
          ) : (
            <Button
              btnName={`Buy for ${nft.price} ${nftCurrency}`}
              classStyles="mr-5 sm:mr-0 rounded-xl"
            />
          )}
        </div>
      </div>

      <Modal
        header="Check Out"
        body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
        footer={
          <div className="flex flex-row sm:flex-col">
            <Button
              btnName="Checkout"
              classStyles="mr-5 sm:mr-0 rounded-xl"
              handleClick={() => {}}
            />{' '}
            <Button
              btnName="Cancel"
              classStyles="rounded-xl"
              handleClick={() => {}}
            />
          </div>
        }
        handleClose={() => {}}
      />
    </div>
  );
};
export default NFTDetails;

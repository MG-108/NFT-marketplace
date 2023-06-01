import React from 'react';
import Image from 'next/image';
import { IFormattedNFTQuery } from '../../types/NFT';
import ParagraphText from '../Text/ParagraphText';
import { shortenAddress } from '../../utils/shortenAddress';

type Props = {
  nft: IFormattedNFTQuery;
  nftCurrency: string;
};

const PaymentBodyCmp: React.FC<Props> = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    {/* ITEM AND TOTAL */}

    <div className="flexBetween">
      <ParagraphText classStyles="text-base minlg:text-xl" text="Item" />
      <ParagraphText classStyles="text-base minlg:text-xl" text="Subtotal" />
    </div>

    {/* NFT IMAGE, SELLER ADDRESS, NFT NAME */}
    <div className="flexBetweenStart my-5">
      <div className="flexStartCenter flex-1">
        <div className="relative h-28 w-28 rounded-3xl">
          <Image
            src={nft.image}
            alt="NFT"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-xl"
          />
        </div>
        <div className="flexCenterStart ml-5 flex-col">
          <ParagraphText
            text={shortenAddress(nft.seller)}
            classStyles="text-sm minlg:text-xl"
          />
          <ParagraphText text={nft.name} classStyles="text-sm minlg:text-xl" />
        </div>
      </div>

      {/* NFT PRICE AND CURRENCY */}
      <div>
        <ParagraphText
          text={`${nft.price} ${nftCurrency}`}
          classStyles="text-sm minlg:text-xl"
        />
      </div>
    </div>

    {/* TOTAL */}
    <div className="flexBetween mt-10">
      <ParagraphText text="Total" classStyles="text-base minlg:text-xl" />{' '}
      <ParagraphText
        text={`${nft.price} ${nftCurrency}`}
        classStyles="text-base minlg:text-xl"
      />
    </div>
  </div>
);
export default PaymentBodyCmp;

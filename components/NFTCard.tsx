import { useContext } from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { NFTContext } from '../context/NFTContext';
import images from '../assets';

interface NFTDetails {
  i?: number;
  name: string;
  seller: string;
  owner: string;
  image?: any;
  price: string;
}

type Props = {
  nft: NFTDetails;
};

const NFTCard: React.FC<Props> = ({ nft }) => {
  const { nftCurrency } = useContext(NFTContext);

  return (
    <Link href={{ pathname: '/nft-details', query: { ...nft } }}>
      <div className="m-4 min-w-215 max-w-max flex-1 cursor-pointer rounded-2xl bg-white p-4 shadow-md dark:bg-nft-black-3 sm:mx-2 sm:my-2 sm:w-full sm:min-w-155 xs:max-w-none minmd:min-w-256 minlg:m-8 minlg:min-w-327">
        <div className="relative h-52 w-full overflow-hidden rounded-2xl sm:h-36 xs:h-56 minmd:h-60 minlg:h-300">
          <Image
            src={nft.image || images[`nft${nft.i}`]}
            fill
            style={{ objectFit: 'cover' }}
            alt={`nft${nft.i}`}
          />
        </div>

        <div className="mt-3 flex flex-col font-poppins text-sm font-semibold text-nft-black-1 dark:text-white minlg:text-xl ">
          {nft.name}
        </div>

        <div className="flexBetween mt-1 flex-row xs:mt-3 xs:flex-col xs:items-start minlg:mt-3">
          <p className='minlg:text-lg" font-poppins text-xs font-semibold text-nft-black-1 dark:text-white'>
            {nft.price} <span className="normal">{nftCurrency}</span>
          </p>
          <p className='minlg:text-lg" font-poppins text-xs font-semibold text-nft-black-1 dark:text-white'>
            {nft.seller}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default NFTCard;

import React from 'react';
import Image, { StaticImageData } from 'next/image';

import images from '../assets';

type Props = {
  rank: number;
  creatorImage: StaticImageData;
  creatorAdress: string;
  creatorsEths: number;
};

const CreatorCard: React.FC<Props> = ({
  rank,
  creatorImage,
  creatorAdress,
  creatorsEths,
}) => (
  <div className="m-4 flex min-w-190 flex-col rounded-3xl border border-nft-gray-1 bg-white p-4 shadow-md dark:border-nft-black-3 dark:bg-nft-black-3 minlg:min-w-240 ">
    <div className="flexCenter h-8 w-8 rounded-full bg-nft-red-violet minlg:h-10 minlg:w-10">
      <p className="minglh:text-lg font-poppins text-base font-semibold text-white">
        {rank}
      </p>
    </div>

    <div className="my-2 flex justify-center">
      <div className="relative h-20 w-20 minlg:h-28 minlg:w-28  ">
        <Image
          src={creatorImage}
          alt="creator name"
          style={{ objectFit: 'cover' }}
          className="rounded-full"
          fill
        />
        <div className="absolute bottom-2 right-0 h-4 w-4 minlg:h-7 minlg:w-7">
          <Image
            src={images.tick}
            alt="tick verified"
            style={{ objectFit: 'contain' }}
            fill
          />
        </div>
      </div>
    </div>

    <div className="flexCenter mt-3 flex-col text-center minlg:mt-7">
      <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
        {creatorAdress}
      </p>
      <p className="mt-1 font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
        {creatorsEths.toFixed(2)} <span className="font-normal">ETH</span>
      </p>
    </div>
  </div>
);
export default CreatorCard;

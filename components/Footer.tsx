import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../assets';
import { Button } from '.';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const { theme } = useTheme();

  const socialMediaImages = [
    images.instagram,
    images.twitter,
    images.telegram,
    images.discord,
  ];

  return (
    <footer
      className="flexCenter flex-col border-t border-nft-gray-1 py-16 dark:border-nft-black-1 sm:py-8
    "
    >
      <div className="flexCenter mt-5 w-full border-t border-nft-gray-1 px-16 dark:border-nft-black-1 sm:px-4">
        <div className="flexBetween mt-7 w-full flex-row sm:flex-col minmd:w-4/5">
          <p className="font-poppins text-base font-semibold text-nft-black-1 dark:text-white">
            ArtHive, Inc. All Rights Reserved.
          </p>
          <ul className="flex flex-row sm:mt-4">
            {socialMediaImages.map((image, i) => (
              <li className="mx-2 cursor-pointer list-none">
                <Image
                  src={image}
                  alt="social media"
                  style={{ objectFit: 'contain' }}
                  width={24}
                  height={24}
                  className={theme === 'light' ? 'invert filter' : undefined}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

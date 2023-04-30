import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import { MenuItems } from '..';
import images from '../../assets';

export type ActiveOption = 'Explore NFTs' | 'Listed NFTs' | 'MyNFTs';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState<ActiveOption>('Explore NFTs');

  useEffect(() => {
    setTheme('dark');
  }, []);

  return (
    <nav className="flexBetween fixed z-10 w-full flex-row border-b border-nft-gray-1 bg-white p-4 dark:border-nft-black-1 dark:bg-nft-dark">
      <div className="flex flex-1 flex-row justify-start">
        {/* LOGO DESKTOP */}
        <Link href="/">
          <div
            className="flexCenter cursor-pointer md:hidden"
            onClick={() => {}}
          >
            <Image
              src={images.logo02}
              style={{ objectFit: 'contain' }}
              width={32}
              height={32}
              alt="logo"
            />
            <p className="ml-1 text-lg font-semibold text-nft-black-1 dark:text-white">
              ArtHive
            </p>
          </div>
        </Link>

        {/* LOGO MD and MOBILE DEVICES */}
        <Link href="/">
          <div className="hidden md:flex" onClick={() => {}}>
            <Image
              src={images.logo02}
              style={{ objectFit: 'contain' }}
              width={32}
              height={32}
              alt="logo"
            />
          </div>
        </Link>
      </div>

      {/* TOGGLE DARK AND LIGHT */}
      <div className="flex flex-initial flex-row justify-end">
        <div className="mr-2 flex items-center">
          <input
            type="checkbox"
            id="checkbox"
            className="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          />
          <label
            htmlFor="checkbox"
            className="flexBetween label relative h-4 w-8 rounded-2xl bg-black p-1"
          >
            {/* fontAwesome icons */}
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            {/* toggle ball that moves onClick */}
            <div className="ball absolute h-3 w-3 rounded-full bg-white" />
          </label>
        </div>
      </div>

      {/* MENU ITEMS DESKTOP */}
      <div className="flex md:hidden">
        <MenuItems active={active} setActive={setActive} />
        <div className="ml-4">{/* <ButtonGroup /> */}</div>
      </div>
    </nav>
  );
};
export default Navbar;

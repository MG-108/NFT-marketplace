import React from 'react';
import Link from 'next/link';

import { ActiveOption } from '.';

type MenuItemsProps = {
  active: ActiveOption;
  setActive: React.Dispatch<React.SetStateAction<ActiveOption>>;
  isMobile?: boolean;
};

const activeOptionsList: ActiveOption[] = [
  'Explore NFTs',
  'Listed NFTs',
  'MyNFTs',
];

const generateLink = (i: number) => {
  switch (i) {
    case 0:
      return '/';

    case 1:
      return '/created-nfts';

    case 2:
      return '/my-nfts';

    default:
      return '/';
  }
};

const MenuItems: React.FC<MenuItemsProps> = ({
  isMobile,
  active,
  setActive,
}) => (
  <ul
    className={`flexCenter list-none flex-row ${
      isMobile && 'h-full flex-col '
    }`}
  >
    {activeOptionsList.map((item, i) => (
      <li
        key={i}
        onClick={() => {
          setActive(item);
        }}
        className={`mx-3 flex flex-row items-center font-poppins text-base font-semibold hover:text-nft-dark dark:hover:text-white 
          ${isMobile && 'py-2'}
          ${
            active === item
              ? 'text-nft-black-1 dark:text-white'
              : 'text-nft-gray-2 dark:text-nft-gray-3'
          }
           `}
      >
        <Link href={generateLink(i)}>{item}</Link>
      </li>
    ))}
  </ul>
);

MenuItems.defaultProps = {
  isMobile: false,
};

export default MenuItems;

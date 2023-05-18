import { useState, useEffect, useRef, useContext } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { NFTContext } from '../../context/NFTContext';
import images from '../../assets';
import { Banner, CreatorCard, HeadingText, NFTCard } from '../../components';
import { makeId } from '../../utils/makeId';

const Home: NextPage = () => {
  const { fetchNFTs } = useContext(NFTContext);
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const [nfts, setNfts] = useState<any[]>([]);
  const { theme } = useTheme();
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchNFTs().then((items) => {
      setNfts(items);
      console.log(items);
    });
  }, []);

  const handleScroll = (direction: string) => {
    const { current } = scrollRef;

    const scrollAmout = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current?.scrollBy({ left: -scrollAmout, behavior: 'smooth' });
    } else {
      current?.scrollBy({ left: scrollAmout, behavior: 'smooth' });
    }
  };

  // Checks whether the content inside the scrollable container is wider
  // than the container itself, and returns a boolean value.
  const isScrollable = () => {
    const { current } = scrollRef;
    const { current: parent } = parentRef;

    // Check whether the scrollable container is wider than its parent element
    if (current && parent) {
      if (current?.scrollWidth >= parent?.offsetWidth) {
        setHideButtons(false);
      } else {
        setHideButtons(true);
      }
    }
  };

  useEffect(() => {
    isScrollable();

    window.addEventListener('resize', isScrollable);
    return () => {
      window.removeEventListener('resize', isScrollable);
    };
  }, []);

  return (
    <div className="flex justify-center p-12 sm:px-4 ">
      <div className="w-full minmd:w-4/5">
        <Banner
          text="Discover, collect, and sell extraordinary NFTs"
          parentStyles="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded-3xl"
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
        />

        {/* TOP SELLER SECTION */}
        <div>
          <HeadingText text="Top Sellers" classStyles="ml-4 xs:ml-0" />

          <div className="relative mt-3 flex max-w-full flex-1" ref={parentRef}>
            <div
              className="no-scrollbar flex w-max select-none flex-row overflow-x-scroll"
              ref={scrollRef}
            >
              {[6, 7, 8, 9, 10].map((i) => (
                <CreatorCard
                  key={`creator-${i}`}
                  rank={i}
                  creatorImage={images[`creator${i}` as keyof typeof images]}
                  creatorAdress="0xAdress"
                  creatorsEths={10 - i * 0.5}
                />
              ))}

              {!hideButtons ? (
                <>
                  <div
                    onClick={() => handleScroll('left')}
                    className="absolute left-0 top-45 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12"
                  >
                    <Image
                      src={images.left}
                      alt="left arrow"
                      fill
                      style={{ objectFit: 'contain' }}
                      className={
                        theme === 'light' ? 'invert filter' : undefined
                      }
                    />
                  </div>

                  <div
                    onClick={() => handleScroll('right')}
                    className="absolute right-0 top-45 h-8 w-8 cursor-pointer minlg:h-12 minlg:w-12"
                  >
                    <Image
                      src={images.right}
                      alt="right arrow"
                      fill
                      style={{ objectFit: 'contain' }}
                      className={
                        theme === 'light' ? 'invert filter' : undefined
                      }
                    />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {/* TOP NFTs SECTION */}
        <div className="mt-10">
          <div className="flexBetween mx-4 sm:flex-col sm:items-start xs:mx-0 minlg:mx-8">
            <HeadingText text="Top NFTs" classStyles="flex-1 sm:mb-4" />
            <div>SearchBar</div>
          </div>

          <div className="mt-3 flex w-full flex-wrap justify-start md:justify-center">
            {nfts.map((nft) => (
              <NFTCard key={nft.tokenId} nft={nft} />
            ))}
            {/* {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
              <NFTCard
                key={`nft-${i}`}
                nft={{
                  i,
                  name: `Nifty NFT ${i}`,
                  price: (10 - i * 0.5).toFixed(2),
                  seller: '0xSeller',
                  owner: '0xOwner',
                }}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useState, useEffect, useRef } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import images from '../../assets';
import { Banner, CreatorCard } from '../../components';
import { makeId } from '../../utils/makeId';

const Home: NextPage = () => {
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const { theme } = useTheme();
  const parentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const isScrollable = (): boolean => {
    // Get a reference to the scrollable container element
    const { current } = scrollRef;

    // Get a reference to the parent element of the scrollable container
    const { current: parent } = parentRef;

    // Check whether the scrollable container is wider than its parent element
    return current?.scrollWidth >= parent?.offsetWidth;
  };

  // Define a function that updates the visibility of the scroll buttons when the window is resized
  const handleResize = () => {
    setHideButtons(!isScrollable());
  };

  // Call the isScrollable function when the component mounts or the window is resized
  useEffect(() => {
    // Initialize the visibility of the scroll buttons based on whether the cards are scrollable
    setHideButtons(!isScrollable());

    // Add a resize event listener to the window
    window.addEventListener('resize', handleResize);

    // Remove the resize event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
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

        <div>
          <h1 className="ml-4 font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white xs:ml-0 minlg:text-4xl">
            Top Sellers
          </h1>

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
                  creatorAdress={`0x${makeId(3)}...${makeId(4)}`}
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
      </div>
    </div>
  );
};

export default Home;

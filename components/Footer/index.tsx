import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTheme } from 'next-themes';

import images from '../../assets';
import { Button, FooterLinks, ParagraphText } from '..';

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const { theme } = useTheme();

  const socialMediaImages: StaticImageData[] = [
    images.instagram,
    images.twitter,
    images.telegram,
    images.discord,
  ];

  return (
    <footer className="flexCenter flex-col border-t border-nft-gray-1 py-16 dark:border-nft-black-1 sm:py-8">
      <div className="flex w-full flex-row px-16 md:flex-col sm:px-4  minmd:w-4/5">
        {/* LEFT SECTION IN DESKTOP AND TOP SECTION IN MOBILE */}
        <section className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              style={{ objectFit: 'contain' }}
              width={32}
              height={32}
              alt="logo"
            />

            <ParagraphText text="ArtHive" classStyles="ml-1 text-lg" />
          </div>

          <ParagraphText
            text="Get the latest Updates"
            classStyles="mt-6 text-base"
            poppins
          />

          <div className="flexBetween mt-6 w-357 rounded-lg border border-nft-gray-2 bg-white dark:border-nft-black-2 dark:bg-nft-black-2 md:w-full minlg:w-557">
            <input
              type="email"
              placeholder="Your Email"
              className="h-full w-full flex-1 rounded-lg bg-white px-4 text-xs font-normal text-nft-black-1 outline-none dark:bg-nft-black-2 dark:text-white minlg:text-lg"
            />
            <div>
              <Button btnName="Email Me" classStyles="rounded-md" />
            </div>
          </div>
        </section>

        {/* RIGHT SECTION IN DESKTOP AND MIDDLE SECTION IN MOBILE */}
        <section className="flexBetweenStart ml-10 flex-1 flex-wrap md:ml-0 md:mt-8">
          <FooterLinks
            heading="ArtHive"
            links={['Explore', 'How it Works', 'Contact Us']}
          />
          <FooterLinks
            heading="Support"
            links={[
              'Help Center',
              'Terms of Service',
              'Legal',
              'Privacy Policy',
            ]}
          />
        </section>
      </div>

      {/* BOTTOM SECTION IN DESKTOP AND MOBILE  */}
      <section className="flexCenter mt-5 w-full border-t border-nft-gray-1 px-16 dark:border-nft-black-1 sm:px-4">
        <div className="flexBetween mt-7 w-full flex-row sm:flex-col minmd:w-4/5">
          <ParagraphText
            text="ArtHive, Inc. All Rights Reserved."
            classStyles="text-base"
            poppins
          />
          <ul className="flex flex-row sm:mt-4">
            {socialMediaImages.map((image, i) => (
              <li className="mx-2 cursor-pointer list-none" key={i}>
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
      </section>
    </footer>
  );
};
export default Footer;

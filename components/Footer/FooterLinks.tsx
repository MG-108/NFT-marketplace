import React from 'react';

type FooterLinksProps = {
  heading: string;
  links: string[];
};

const FooterLinks: React.FC<FooterLinksProps> = ({ heading, links }) => (
  <div className="flex-1 items-start justify-start">
    <h3 className="mb-8 font-poppins text-xl font-semibold text-nft-black-1 dark:text-white md:mb-6">
      {heading}
    </h3>
    {links.map((link, i) => (
      <p
        key={i}
        className="my-3 cursor-pointer font-poppins text-base font-normal text-nft-black-1 hover:text-nft-dark dark:text-white dark:hover:text-nft-gray-1"
      >
        {link}
      </p>
    ))}
  </div>
);
export default FooterLinks;

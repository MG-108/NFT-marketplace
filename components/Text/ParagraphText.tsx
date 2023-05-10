import React from 'react';

type Props = {
  text: string;
  classStyles?: string;
};

const ParagraphText: React.FC<Props> = ({ text, classStyles }) => (
  <p
    className={`${classStyles} font-poppins  font-semibold text-nft-black-1 dark:text-white`}
  >
    {text}
  </p>
);
export default ParagraphText;

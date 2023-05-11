import React from 'react';
import { ParagraphText } from '.';

type Props = {
  inputType: string;
  title: string;
  placeholder: string;
  handleClick: React.ChangeEventHandler;
};

const Input: React.FC<Props> = ({
  inputType,
  title,
  placeholder,
  handleClick,
}) => {
  const inputStyles =
    'mt-4 w-full rounded-lg border border-nft-gray-2 bg-white px-4 py-3 font-poppins text-base text-nft-gray-2 outline-none dark:border-nft-black-1 dark:bg-nft-black-1 dark:text-white';

  return (
    <div className="mt-10 w-full">
      <ParagraphText text={title} classStyles="text-xl" poppins />

      {inputType === 'number' ? (
        <div className={`flexBetween flex-row ${inputStyles}`}>
          <input
            type="number"
            placeholder={placeholder}
            onChange={handleClick}
            className="w-full bg-white outline-none dark:bg-nft-black-1"
          />
          <ParagraphText text="ETH" classStyles="text-xl" poppins />
        </div>
      ) : inputType === 'textarea' ? (
        <textarea
          className={inputStyles}
          rows={10}
          placeholder={placeholder}
          onChange={handleClick}
        />
      ) : (
        <input
          className={inputStyles}
          placeholder={placeholder}
          onChange={handleClick}
        />
      )}
    </div>
  );
};
export default Input;

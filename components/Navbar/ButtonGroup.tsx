/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { NextRouter } from 'next/router';

import { NFTContext } from '../../context/NFTContext';
import { Button } from '..';
import { ActiveOption } from '.';
import { INFTContext } from '../../types/NFT';

type ButtonGroupProps = {
  setActive: (value: React.SetStateAction<ActiveOption>) => void;
  router: NextRouter;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  setActive,
  setIsOpen,
  router,
}) => {
  const { connectWallet, currentAccount } = useContext<INFTContext>(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');

        router.push('/create-nft');

        if (setIsOpen) {
          setTimeout(() => {
            setIsOpen(false);
          }, 200);
        }
      }}
    />
  ) : (
    <Button
      btnName="Connect"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};
export default ButtonGroup;

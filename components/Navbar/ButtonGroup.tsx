/* eslint-disable no-unused-vars */
import { useContext } from 'react';
import { NextRouter } from 'next/router';

import { NFTContext } from '../../context/NFTContext';
import { Button } from '..';
import { ActiveOption } from '.';

type ButtonGroupProps = {
  setActive: (value: React.SetStateAction<ActiveOption>) => void;
  router: NextRouter;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');

        router.push('/create-nft');
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

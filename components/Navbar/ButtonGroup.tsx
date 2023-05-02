/* eslint-disable no-unused-vars */
import React from 'react';
import { NextRouter } from 'next/router';
import { Button } from '..';
import { ActiveOption } from '.';

type ButtonGroupProps = {
  setActive: (value: React.SetStateAction<ActiveOption>) => void;
  router: NextRouter;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
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
      handleClick={() => {}}
    />
  );
};
export default ButtonGroup;

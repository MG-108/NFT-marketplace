import { useRef } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';

import images from '../../assets';
import { HeadingText } from '..';

type Props = {
  header: string;

  footer: JSX.Element;
  handleClose: () => void;
};

const Modal: React.FC<Props> = ({ header, body, footer, handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  return (
    <div className="flexCenter animated  fadeIn fixed inset-0 z-10 bg-overlay-black">
      <div
        ref={modalRef}
        className="flex w-2/5 flex-col rounded-lg bg-white dark:bg-nft-dark md:w-11/12 minlg:w-2/4"
      >
        <div className="mr-4 mt-4 flex justify-end minlg:mr-6 minlg:mt-6">
          <div className="relative h-3 w-3 cursor-pointer minlg:h-6 minlg:w-6">
            <Image
              src={images.cross}
              alt="close"
              fill
              className={`${theme === 'light' ? 'invert filter' : undefined}`}
            />
          </div>
        </div>

        <div className="flexCenter font w-full p-4 text-center">
          <HeadingText text={header} tag="h2" classStyles="font-normal" />
        </div>
        <div className="border-b border-t border-nft-gray-1 p-10 dark:border-nft-black-3 sm:px-4">
          {body}
        </div>
        <div className="flexCenter p-4">{footer}</div>
      </div>
    </div>
  );
};
export default Modal;

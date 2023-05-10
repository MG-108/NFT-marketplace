import { useState, useMemo, useCallback, useContext } from 'react';
import { Router } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button, HeadingText } from '../../components';
import images from '../../assets';
import ParagraphText from '../../components/Text/ParagraphText';

type Props = {};

const CreateNFT: React.FC<Props> = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const { theme } = useTheme();

  const onDrop = useCallback(() => {
    // upload image(nft) to blockchain( IPFS)
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5000000,
  });

  const fileStyle = useMemo(
    () => `dark:bg-nft-black-1 bg-neutral-100 border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
      ${isDragActive && 'border-file-active'}
      ${isDragAccept && 'border-file-accept'}
      ${isDragReject && 'border-file-reject'}
      `,
    [isDragActive, isDragAccept, isDragReject]
  );

  return (
    <div className="flex justify-center p-12 sm:px-4 ">
      <div className="w-3/5 md:w-full">
        <HeadingText text="Create new NFT" classStyles="ml-4 xs:ml-0" />

        <div className="mt-16">
          <ParagraphText classStyles="text-xl" text="Upload File" />

          {/* FILE DROPZONE SECTION */}
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <ParagraphText
                  classStyles="text-xl"
                  text="JPG, PNG, GIF, SVG, WEBM Max 100mb."
                />

                <div className="my-12 flex w-full justify-center">
                  <Image
                    src={images.upload}
                    alt="file upload"
                    width={100}
                    height={100}
                    style={{ objectFit: 'contain' }}
                    className={theme === 'light' ? 'invert filter' : undefined}
                  />
                </div>
                <div>
                  <ParagraphText
                    text="Drag and Drop File"
                    classStyles="text-sm"
                  />
                  <ParagraphText
                    text="or Browse media on your device"
                    classStyles="text-sm mt-2"
                  />
                </div>
              </div>

              {fileUrl && (
                <aside>
                  <div>
                    <img src={fileUrl} alt="asset_file" />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateNFT;

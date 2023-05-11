import { useState, useMemo, useCallback, useContext } from 'react';
import { Router } from 'next/router';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import { Button, HeadingText, Input } from '../../components';
import images from '../../assets';
import ParagraphText from '../../components/Text/ParagraphText';

type Props = {};

const CreateNFT: React.FC<Props> = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: '',
    description: '',
    price: '',
  });
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
          <ParagraphText classStyles="text-xl" text="Upload File" poppins />
          {/* FILE DROPZONE SECTION */}
          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <ParagraphText
                  classStyles="text-xl"
                  text="JPG, PNG, GIF, SVG, WEBM Max 100mb."
                  poppins
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
                    poppins
                  />
                  <ParagraphText
                    text="or Browse media on your device"
                    classStyles="text-sm mt-2"
                    poppins
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

          <Input
            inputType="input"
            title="Name"
            placeholder="NFT Name"
            handleClick={(e) =>
              setFormInput({
                ...formInput,
                name: (e.target as HTMLInputElement).value,
              })
            }
          />
          <Input
            inputType="textarea"
            title="Description"
            placeholder="NFT Description"
            handleClick={(e) =>
              setFormInput({
                ...formInput,
                description: (e.target as HTMLTextAreaElement).value,
              })
            }
          />
          <Input
            inputType="number"
            title="Price"
            placeholder="NFT Price"
            handleClick={(e) =>
              setFormInput({
                ...formInput,
                price: (e.target as HTMLInputElement).value,
              })
            }
          />

          <div className="mt-7 flex w-full justify-end">
            <Button
              btnName="Create Item"
              classStyles="rounded-xl"
              handleClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateNFT;

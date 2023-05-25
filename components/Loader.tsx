import Image from 'next/image';
import images from '../assets';

const Loader: React.FC = () => (
  <div className="flexCenter my-4 w-full ">
    <Image
      src={images.loader}
      alt="loader"
      width={100}
      style={{ objectFit: 'contain' }}
    />
  </div>
);
export default Loader;

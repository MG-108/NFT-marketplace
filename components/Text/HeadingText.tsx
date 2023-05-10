type Props = {
  text: string;
  classStyles?: string;
};

const HeadingText: React.FC<Props> = ({ text, classStyles }) => (
  <h1
    className={`${classStyles} font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-4xl`}
  >
    {text}
  </h1>
);
export default HeadingText;

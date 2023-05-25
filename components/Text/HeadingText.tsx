type Props = {
  text: string;
  classStyles?: string;
  tag?: keyof JSX.IntrinsicElements;
};

const HeadingText: React.FC<Props> = ({ text, classStyles, tag }) => {
  const Tag = tag || 'h1';

  return (
    <Tag
      className={`${classStyles} font-poppins text-2xl font-semibold text-nft-black-1 dark:text-white minlg:text-4xl`}
    >
      {text}
    </Tag>
  );
};
export default HeadingText;

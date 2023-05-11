type Props = {
  text: string;
  classStyles?: string;
  poppins?: boolean;
};

const ParagraphText: React.FC<Props> = ({ text, classStyles, poppins }) => (
  <p
    className={`${classStyles} ${
      poppins && 'font-poppins'
    }  font-semibold text-nft-black-1 dark:text-white`}
  >
    {text}
  </p>
);
export default ParagraphText;

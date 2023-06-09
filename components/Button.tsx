import React from 'react';

type ButtonProps = {
  classStyles?: string;
  btnName: string;
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button: React.FC<ButtonProps> = ({
  classStyles,
  btnName,
  handleClick,
}) => (
  <button
    type="button"
    className={`nft-gradient px-6 py-2 font-poppins text-sm font-semibold text-white minlg:px-8 minlg:text-lg ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
);
export default Button;

Button.defaultProps = {
  classStyles: '',
  handleClick: () => {},
};

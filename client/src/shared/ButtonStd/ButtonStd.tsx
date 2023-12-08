import { FC, HTMLProps } from 'react';
import './ButtonStd.css';

interface ButtonProps extends HTMLProps<HTMLButtonElement>{
  func?(): void
}

const ButtonStd: FC<ButtonProps> = ({func, ...props}) => {
  return(
    <button className='button-standard' onClick={func}>
      {props.children}
    </button>
  );
};

export default ButtonStd;
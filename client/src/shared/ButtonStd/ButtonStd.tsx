import { FC, HTMLProps } from 'react';
import './ButtonStd.css';

interface ButtonProps extends HTMLProps<HTMLButtonElement>{
  // func?(): void
}

const ButtonStd: FC<ButtonProps> = ({...props}) => {
  return(
    <button className='button-standard'>
      {props.children}
    </button>
  );
};

export default ButtonStd;
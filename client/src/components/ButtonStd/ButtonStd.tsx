import { FC, HTMLProps } from 'react';
import './ButtonStd.css';

interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, React.AriaAttributes{
  func?(): void,
}

const ButtonStd: FC<ButtonProps> = ({func, children, ...props}) => {
  return(
    <button className='button-standard' onClick={func} {...props}>
      {children}
    </button>
  );
};

export default ButtonStd;
import { FC, HTMLProps } from 'react';
import './ButtonNav.css';
import { useNavigate } from 'react-router-dom';

interface ButtonProps extends HTMLProps<HTMLButtonElement>{
  to?: string,
}

const ButtonNav: FC<ButtonProps> = ({to, ...props}) => {
  const navigate = useNavigate();

  const onClickRedirect = () => {
    navigate('/' + to)
  }

  return(
  <button className='btn' onClick={onClickRedirect}>
    {props.children}
  </button>
  );
};

export default ButtonNav;
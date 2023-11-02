import { FC } from 'react';
import './ButtonNav.css';
import { redirect, useNavigate } from 'react-router-dom';


const ButtonNav: FC<props> = (props) => {
  const navigate = useNavigate();

  const onClickRedirect = () => {
    navigate('/' + props.to)
  }

  return(
  <button className='btn' onClick={onClickRedirect}>
    {props.children}
  </button>
  );
};

export default ButtonNav;
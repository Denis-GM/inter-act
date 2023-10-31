import {FC} from 'react';
import './ButtonNav.css';

const ButtonNav: FC<{children: any}> = ({children}) => {
  return(
  <button className='btn'>
    {children}
  </button>
  )
};

export default ButtonNav;
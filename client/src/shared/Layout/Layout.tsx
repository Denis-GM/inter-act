import {FC, HTMLProps, useEffect, useState} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './Layout.css';
import ButtonNav from '../ButtonNav/ButtonNav';

interface LabelProps extends HTMLProps<HTMLLabelElement>{
  isActive: boolean,
}

const Layout: FC = () => {
  const setActive = ({ isActive }) =>(isActive ? " active" : "");

  const [login, setLogin] = useState<string>('');

  useEffect(() => {
    const lg: string = localStorage.getItem('login') ? localStorage.getItem('login')! : '';
    setLogin(lg)
  }, [])

  return (
    <>
      <header className='header'>
        <ul className='layout-container'>
          <li className='nav-block'>
            <Link className='logo reset-link' to='main'>InterACT</Link>
            <div className='menu'>
              <NavLink to='main' className={`reset-link setActive`}>Главная</NavLink>
              <NavLink to='collections' className={`reset-link setActive`}>Подборки</NavLink>
              <NavLink to='organizers' className={`reset-link setActive`}>Организаторы</NavLink>
            </div>
          </li>
          <li className='btns'>
            <ButtonNav to={'create-event'}>Создать событие</ButtonNav>
            {!login && <ButtonNav to={'sign-in'}>Вход</ButtonNav>}
            {login && <ButtonNav to={'profile'}>{login}</ButtonNav>}
          </li>
        </ul>
      </header>
      <main className='main'>
        <Outlet />
      </main>
    </>
  )
};

export default Layout;
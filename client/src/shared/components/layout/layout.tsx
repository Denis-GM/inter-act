import {FC} from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import './layout.css';
import ButtonNav from '../button/ButtonNav';

const Layout: FC = () => {
  const setActive = ({ isActive }) =>(isActive ? " active" : "");

    return (
      <>
        <header className='header'>
          <ul className='layout-container'>
            <li className='nav-block'>
              <Link className='logo reset-link' to='main'>InterACT</Link>
              <div className='menu'>
                <NavLink to='main' className={`reset-link setActive`}>Главная</NavLink>
                <NavLink to='collections' className={`reset-link setActive`}>Подборки</NavLink>
                <div className='search'>Поиск</div>
              </div>
            </li>
            <li className='btns'>
              <ButtonNav to={'sign-in'}>Создать событие</ButtonNav>
              <ButtonNav to={'sign-up'}>Вход</ButtonNav>
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
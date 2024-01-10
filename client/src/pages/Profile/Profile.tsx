import {FC, useEffect, useState} from 'react';
import ButtonStd from '../../components/ButtonStd/ButtonStd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Profile.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';


const Profile: FC = () => {
  const [account, setAccount] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    getAccount();
  }, [])

  async function getAccount() {
		try {
      const res = await axios.post('/api/account', {id: localStorage.getItem('auth-token')});
      const resData: any = res.data;
      console.log(resData);
      setAccount(resData);
      
		}
    catch(err) {
      console.log(err);
		}
	};
  
  function exitAccount() {
    localStorage.setItem('auth-token', '');
    localStorage.setItem('name', '');
    localStorage.setItem('login', '');
    navigate('/main')
  }

  return(
    <>
      <div className='profile-main-block'>
        <img src="" alt="photo" className='photo-profile'/>
        <div className='profile-main-block__content'>
          <h3 className='profile-main-block_h'>{account.full_name}</h3>
          <label className='profile-input-block'>
            Почта
            <span className='profile-input-block__data'>{account.email}</span>
          </label>
          <label className='profile-input-block'>
            Логин
            <span className='profile-input-block__data'>{account.login}</span>
          </label>
          <label className='profile-input-block'>
            Пароль
            <span className='profile-input-block__data'>{account.password}</span>
          </label>
          <div className='profile-btns'>
            <div className='btn-exit' >
              <ButtonStd onClick={exitAccount}>Выйти</ButtonStd>
            </div>
            <div className='btn-exit'>
              <ButtonStd onClick={exitAccount}>Изменить данные</ButtonStd>
            </div>
          </div>
        </div>
      </div>
      <div className='profile-events-created'>
        <SectionTitle>Созданные мероприятия</SectionTitle>
        <div></div>
      </div>
      <div className='profile-planned-events'>
        <SectionTitle>Запланированные мероприятия</SectionTitle>
        <div></div>
      </div>
    </>
  )
}

export default Profile;
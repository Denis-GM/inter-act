import {FC, useEffect, useState} from 'react';
import './Profile.css';
import ButtonStd from '../../shared/ButtonStd/ButtonStd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
    navigate('/main')
  }

  return(<>
    <div className='profile-main-block'>
      <img src="" alt="photo" className='photo-profile'/>
      <div className='profile-main-block__content'>
        <h3 className='profile-main-block_h'>{account.full_name}</h3>
        <div>{account.email}</div>
        <div className='btn-exit' onClick={exitAccount}>
          <ButtonStd>Выйти</ButtonStd>
        </div>
      </div>
    </div>
    <div className='profile-events-created'>
      <h3 className='profile-events-created_h'>Созданные мероприятия</h3>
      <div></div>
    </div>
    <div className='profile-planned-events'>
      <h3 className='profile-planned-events_h'>Запланированные мероприятия</h3>
      <div></div>
    </div>
  </>)
}

export default Profile;
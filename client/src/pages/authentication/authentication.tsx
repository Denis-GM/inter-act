import {FC} from 'react';
import ValidatedInput from '../../shared/ValidatedInput/ValidatedInput';
import ButtonStd from '../../shared/ButtonStd/ButtonStd';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './authentication.css';

const Authentication: FC = () => {
  const { 
    register, 
    handleSubmit,  
    watch,
    formState: { errors } 
  } = useForm();
  
  const navigate = useNavigate();

  const onSubmit = () => {
    const login: string = watch("login");
    const password: string = watch("password");
    if(login.length > 4 && password.length > 4) {
      postAccount(
        {login: login, password: password}
      );
    }
    else {
      console.log('invalid')
    }
  }

	async function postAccount(data: any) {
		try {
      const res = await axios.post('/api/login', data);
      const resData: any = res.data;
      console.log(resData);
      localStorage.setItem('auth-token', resData.id);
      localStorage.setItem('name', resData.full_name);
      localStorage.setItem('login', resData.login);
      navigate("/main");
		}
    catch(err) {
      console.log(err);
		}
	};
  
	return(
		<>
		<div className='container'>
			<h3 className='title'>Вход</h3>
      <div className='main-block'>
        <form onSubmit={handleSubmit(onSubmit)} 
          className='main-block__form'>
          <div>
            <div className='input-auth'>
              <ValidatedInput text="Логин" type="text" 
                placeholder='login123' 
                {...register("login", { required: true })}
                validated />
            </div>
            <div className='input-auth'>
              <ValidatedInput text="Пароль" type="password" 
                placeholder='554409' 
                {...register("password", { required: true })}
                validated />
            </div>
            <Link to="/sign-up" className='link-registr'>
              Еще нет аккаунта? Зарегистрироваться
            </Link>
          </div>
          <ButtonStd type='submit'>Войти</ButtonStd>
        </form>
      </div>
		</div>
		</>
	)
}

export default Authentication;
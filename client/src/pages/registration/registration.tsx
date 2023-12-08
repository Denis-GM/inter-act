import {FC} from 'react';
import ButtonStd from '../../shared/ButtonStd/ButtonStd';
import ValidatedInput from '../../shared/ValidatedInput/ValidatedInput';
import { Link, redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

import './Registration.css';

const Registration: FC = () => {
  const { 
    register, 
    handleSubmit,  
    watch,
    formState: { errors } 
  } = useForm();

  const navigate = useNavigate();
  

  // Исправить 
  const onSubmit = (data: any) => {
    const fullName: string = watch("full_name");
    const email: string = watch("email");
    const login: string = watch("login");
    const password: string = watch("password");
    const password2: string = watch("password2");
    if(fullName != '' && login.length > 4 && password.length > 4 && password == password2) {
      postAccount(
        {full_name: fullName, email: email, login: login, password: password}
      );
    }
    else {
      console.log('invalid')
    }
  }

	async function postAccount(data: any) {
		try {
      const res = await axios.post('/api/register', data);
      console.log(res.data);
      navigate("/sing-in");
		}
    catch(err) {
      console.log(err);
		}
	};

	return(
		<>
		<div className='container-reg'>
			<h3 className='title'>Регистрация</h3>
			<div className='main-block-reg'>
				<form onSubmit={handleSubmit(onSubmit)}
          className='main-block-reg__form'>
					<div>
            <div className='input-reg'>
              <ValidatedInput text="ФИО" type="text" 
                placeholder='Иванов Иван Иванович'
                {...register("full_name", { required: true })} validated/>
						</div>
						<div className='input-reg'>
              <ValidatedInput text="Электронная почта" type="email" 
                placeholder='denis@yandex.ru'
                {...register("email", { required: true })} validated />
						</div>
            <div className='input-reg'>
              <ValidatedInput text="Логин" type="text" 
                placeholder='denis12345'
                {...register("login", { required: true })} validated />
						</div>
						<div className='input-reg'>
              <ValidatedInput text="Пароль" type="password" 
                placeholder='554409'
                {...register("password", { required: true })} validated />
						</div>
            <div className='input-reg'>
              <ValidatedInput text="Подтвердите пароль" type="password" 
                placeholder='554409'
                {...register("password2", { required: true })} validated />
						</div>
						<Link to="/sign-in" className='link-login'>
						  Уже есть аккаунт? Войдите
						</Link>
					</div>
					<ButtonStd type='submit'>Зарегистрироваться</ButtonStd>
				</form>
			</div>
		</div>
		</>
	)
}

export default Registration;
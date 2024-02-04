import {FC} from 'react';
import ButtonStd from '../../components/ButtonStd/ButtonStd';
import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
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
  
  const onSubmit = (data: any) => {
    const password: string = watch("password");
    const password2: string = watch("password2");
    if(password == password2) {
      postAccount({full_name: data.full_name, email: data.email, login: data.login, password: data.password});
    }
    else {
      alert('Пароли не совпадают')
    }
  }

  const handleError = (errors: any) => {
    console.log(errors)
    alert(errors);
  };

	async function postAccount(data: any) {
		try {
      const res = await axios.post('/api/register', data);
      if(res.statusText == 'OK'){
				console.log(res);
			}
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
				<form onSubmit={handleSubmit(onSubmit, handleError)}
          className='main-block-reg__form'>
					<div>
            <div className='input-reg'>
              <ValidatedInput text="ФИО" type="text" 
                placeholder='Иванов Иван Иванович' isRequired={true}
                {...register("full_name", { required: true })}/>
						</div>
						<div className='input-reg'>
              <ValidatedInput text="Электронная почта" type="email" 
                placeholder='denis@yandex.ru' isRequired={true}
                {...register("email", { required: true})}/>
						</div>
            <div className='input-reg'>
              <ValidatedInput text="Логин" type="text" 
                placeholder='denis12345' isRequired={true}
                {...register("login", { required: true, minLength: 4 })}/>
						</div>
						<div className='input-reg'>
              <ValidatedInput text="Пароль" type="password" 
                placeholder='554409' isRequired={true}
                {...register("password", { required: true, minLength: 4 })}/>
						</div>
            <div className='input-reg'>
              <ValidatedInput text="Подтвердите пароль" type="password" 
                placeholder='554409' isRequired={true}
                {...register("password2", { required: true, minLength: 4 })}/>
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
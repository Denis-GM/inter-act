import {FC} from 'react';
import ValidatedInput from '../../components/ValidatedInput/ValidatedInput';
import ButtonStd from '../../components/ButtonStd/ButtonStd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import './authentication.css';

const Authentication: FC = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      login: '',
      password: ''
    }
  });
  
  const navigate = useNavigate();

  const handleLogin = (data: any) => {
    postAccount({login: data.login, password: data.password});
  }

  const handleError = (errors: any) => {
    console.log(errors);
  };

	async function postAccount(data: any) {
		try {
      const res = await axios.post('/api/login', data);
      if(res.statusText == 'OK')
        console.log(res);
      const resData: any = res.data;
      localStorage.setItem('auth-token', resData.id);
      localStorage.setItem('id', resData.id);
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
        <form onSubmit={handleSubmit(handleLogin, handleError)} 
          className='main-block__form'>
          <div>
            <div className='input-auth'>
              <ValidatedInput text="Логин" type="text" 
                placeholder='login123' 
                {...register("login", { required: true })} 
              />
            </div>
            <div className='input-auth'>
              <ValidatedInput text="Пароль" type="password" 
                placeholder='554409' 
                {...register("password", { required: true })}
              />
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
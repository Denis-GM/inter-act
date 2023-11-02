import {FC} from 'react';
import './authentication.css';

const Authentication: FC = () => {
	return(
		<>
		<div className='container'>
			<h3 className='title'>Вход</h3>
      <div className='main-block'>
        <form action="GET">
          <div>
            Электронная почта
            <input type="text" />
          </div>
          <div>
            Пароль
            <input type="text" />
          </div>
        </form>
      </div>
		</div>
		</>
	)
}

export default Authentication;
import {FC, useEffect, useState} from 'react';
import './Event.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonStd from '../../shared/ButtonStd/ButtonStd';

const Event: FC = () => {
  const params = useParams();
  const [event, setEvent] = useState<any>({});

  useEffect(() => {
    getEvent();
  }, [])

  async function getEvent() {
    try {
      const res = await axios.get('/api/event/' + params.id);
      setEvent(res.data);
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
  };
  
	return(
		<>
      <div className='event-img'>
        {/* <img src='../../assets/img/cat1.jpg' alt="event" /> */}
      </div>
			<div className='title-e'>{event.title}</div>
      <div className='event-container'>
        <div style={{width: '60%'}}>
          <div className='data'>{event.description}</div>
          <div className='data' style={{margin: '0'}}>
            <h4 className='data__h'>Основная информация</h4>
            <ul className='data__list'>
              <li>Город: {event.city}</li>
              <li>Дата: {event.date}</li>
              <li>Время: {event.time_start} - {event.time_end}</li>
            </ul>
          </div>
        </div>
        <div className='event-container__registration'>
          <div>Запись</div>
          <ul className='data__list'>
              <li>Организатор: Иван Иванов</li>
              <li>Контакты: {event.date}</li>
          </ul>
          <ButtonStd>Записаться</ButtonStd>
        </div>
      </div>
      <div className='data'>
        <h4 className='data__h'>Обсуждение</h4>
      </div>
		</>
	)
}

export default Event;
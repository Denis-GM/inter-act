import {FC, useEffect, useState} from 'react';
import './Event.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ButtonStd from '../../components/ButtonStd/ButtonStd';
import ImageBox from '../../components/ImageBox/ImageBox';

const Event: FC = () => {
    const params = useParams();
    const [event, setEvent] = useState<any>({});
    const [subscribe, setSubscribe] = useState<any>({});
    const [existSubscribe, setExistSubscribe] = useState<any>();

    useEffect(() => {
        getEvent();
    }, [])

    async function getEvent() {
        try {
            const res = await axios.get('/api/event/' + params.id);
            // console.log({event_id: res.data.id, subscriber_id: Number(localStorage.getItem('id'))})
            const subscribe = await axios.post('/api/existSubscribe', 
                {event_id: res.data.id, subscriber_id: Number(localStorage.getItem('id'))});
            setEvent(res.data);
            console.log(res.data);
            setSubscribe(subscribe.data);
            setExistSubscribe(subscribe.data.exist);
            // console.log(res.data);
            // console.log(subscribe.data.exist);
        }
        catch(err){
            console.log(err);
        }
    };

    async function postSubscribe(eventId: number) {
        const data = {event_id: eventId, subscriber_id: Number(localStorage.getItem('id'))}
        try {
            const res = await axios.post('/api/subscribe', data);
            setSubscribe(res.data);
            setExistSubscribe(true);
            if(res.statusText == 'Created')
                console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }

    async function postUnsubscribe() {
        try {
            const res = await axios.delete('/api/subscribe/' + subscribe.idSubscribe);
            setExistSubscribe(false);
            if(res.statusText == 'OK')
                console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    }
    
    return(
        <>
            <div className='event-img'>
                {event.photo && <ImageBox data={event.photo} className='block-event__img'></ImageBox>}
            </div>
                    <div className='title-e'>{event.title}</div>
            <div className='title-el'>
                <div>-</div>
                { existSubscribe ? 
                    <div style={{color: '#20bb54'}}>ВЫ ЗАПИСАНЫ НА ДАННОЕ МЕРОПРИЯТИЕ</div> :
                    <div style={{color: 'black'}}>ВЫ МОЖЕТЕ ЗАПИСАТЬСЯ НА МЕРОПРИЯТИЕ</div>
                }
                <div>+</div>
            </div>
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
                    <li>Контакты: комментарии</li>
                </ul>
                { !existSubscribe && 
                    <ButtonStd onClick={() => postSubscribe(event.id)}>Записаться</ButtonStd>
                }
                { existSubscribe && 
                    <ButtonStd onClick={() => postUnsubscribe()}>Отписаться</ButtonStd>
                }
                </div>
            </div>
            <div className='data'>
                <h4 className='data__h'>Обсуждение</h4>
            </div>
        </>
    )
}

export default Event;
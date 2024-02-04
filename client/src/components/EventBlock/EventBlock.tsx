import {FC, HTMLProps, useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import ImageBox from '../ImageBox/ImageBox';

import './EventBlock.css';
import axios from 'axios';
import ButtonStd from '../ButtonStd/ButtonStd';

interface IEventBlock extends HTMLProps<HTMLDivElement> {
  event: any,
  canEdit?: boolean, 
  onDelete?: void,
}

const EventBlock: FC<IEventBlock> = ({event, canEdit = false, ...props}) => {
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        if(canEdit){
            getExistSubscriptions();
        }
    }, [])

    async function deleteEvent() {
        try {
            if(confirm('Удалить мероприятие?')) {
                const res = await axios.delete('/api/event/' + event.id);
            }
        }
        catch(err){
            console.log(err);
        }
    };

    async function getExistSubscriptions() {
        try {
            const res = await axios.get('/api/existSubscriptions/' + event.id);
            setCount(res.data['COUNT(event_id)']);
        }
        catch(err){
            console.log(err);
        }
    };

  return(
    <div className='event-block'>
        <div className='event-block__header'>
            <ImageBox data={event.photo}></ImageBox>
        </div>
        <div className='event-block__main'>
            {/* <div className='event-block__organizer'>{event.organizer}</div> */}
            <h3 className='event-block__title'>{event.title}</h3>
            <div className='event-block__description'>{event.description}</div>
            <div className='event-block__city'>{event.city}</div>
            <div className='event-block__deadline'>{event.date}: {event.time_start} - {event.time_end}</div> 
            {canEdit && <div style={{margin: '10px 0 5px 0', fontSize: '12px'}}>Количество подписок: {count}</div>} 
            <Link className='link-standard' to={`/event/${event.id}`}>Подробнее</Link>
            {canEdit && <ButtonStd className='link-standard-delete' onClick={deleteEvent}>Удалить</ButtonStd>}
        </div>
    </div>
  )
}

export default EventBlock;
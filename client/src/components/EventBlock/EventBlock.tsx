import {FC, HTMLProps, useEffect} from 'react';
import { Link } from 'react-router-dom';
import ImageBox from '../ImageBox/ImageBox';

import './EventBlock.css';

interface IEventBlock extends HTMLProps<HTMLDivElement> {
  event: any,
}

const EventBlock: FC<IEventBlock> = ({event, ...props}) => {

  useEffect(() => {
    console.log(event)
  }, [])

  return(
    <div className='event-block'>
      <div className='event-block__header'>
        <ImageBox data={event.photo.data}></ImageBox>
      </div>
      <div className='event-block__main'>
        <div className='event-block__organizer'>{event.organizer}</div>
        <h3 className='event-block__title'>{event.title}</h3>
        <div className='event-block__description'>{event.description}</div>
        <div className='event-block__city'>{event.city}</div>
        <div className='event-block__deadline'>{event.date}: {event.time_start} - {event.time_end}</div>  
        <Link className='link-standard' to={`/event/${event.id}`}>Подробнее</Link>
      </div>
    </div>
  )
}

export default EventBlock;
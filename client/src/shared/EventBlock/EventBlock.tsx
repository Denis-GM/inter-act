import {FC, HTMLProps} from 'react';
import './EventBlock.css';

interface IEventBlock extends HTMLProps<HTMLDivElement> {
  event: any,
}

const EventBlock: FC<IEventBlock> = ({event, ...props}) => {
  return(
    <div className='event-block'>
      <div className='event-block__header'></div>
      <div className='event-block__main'>
          <div className='event-block__organizer'>{event.organizer}</div>
          <h3 className='event-block__title'>{event.title}</h3>
          <div className='event-block__description'>{event.description}</div>
          <div className='event-block__city'>{event.city}</div>
          <div className='event-block__deadline'>{event.date}: {event.time_start} - {event.time_end}</div>
      </div>
    </div>
  )
}

export default EventBlock;
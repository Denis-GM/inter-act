import {FC, useState} from 'react';
import SectionTitle from '../../../../shared/components/sectionTitle/sectionTitle';

import './listMyEvents.css';

const ListMyEvents: FC<{events: any}> = ({events}) => {
    const [isActiveMyEvents, setIsActiveMyEvents] = useState(true);

    function updateActiveMyEvents() {
        setIsActiveMyEvents(isActiveMyEvents => !isActiveMyEvents);
    }

    return (<>
    <SectionTitle text="Мои мероприятия" func={updateActiveMyEvents}/>
    {isActiveMyEvents && 
    <div className='content'>
        {events.map((event: any) => (
            <div className='event-block' key={event.id}>
                <div className='event-block__header'></div>
                <div className='event-block__main'>
                    <div className='event-block__organizer'>{event.organizer}</div>
                    <h3 className='event-block__title'>{event.title}</h3>
                    <div className='event-block__description'>{event.description}</div>
                    <div className='event-block__city'>{event.city}</div>
                    <div className='event-block__deadline'>{event.date}: {event.timeStart} - {event.timeEnd}</div>
                </div>
            </div>)
        )}
    </div>
    }
    </>)
};

export default ListMyEvents;
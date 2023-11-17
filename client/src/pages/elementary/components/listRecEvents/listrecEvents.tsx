import {FC, useState} from 'react';
import './listRecEvents.css';
import SectionTitle from '../../../../shared/components/sectionTitle/sectionTitle';

const ListRecEvents: FC<{events: any}> = ({events}) => {
    const [isActiveRecEvents, setIsActiveRecEvents] = useState(true);

    function updateActiveRecEvents() {
        setIsActiveRecEvents(isActiveMyEvents => !isActiveMyEvents);
    }

    return (<>
    <SectionTitle text="Редомендации" func={updateActiveRecEvents}/>
    {isActiveRecEvents && 
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

export default ListRecEvents;
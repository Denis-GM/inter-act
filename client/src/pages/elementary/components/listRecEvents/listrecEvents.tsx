import {FC, useState} from 'react';
import './listRecEvents.css';
import SectionTitle from '../../../../shared/SectionTitle/SectionTitle';
import EventBlock from '../../../../shared/EventBlock/EventBlock';

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
            <EventBlock key={event.id} event={event}></EventBlock>)
        )}
    </div>
    }
    </>)
};

export default ListRecEvents;
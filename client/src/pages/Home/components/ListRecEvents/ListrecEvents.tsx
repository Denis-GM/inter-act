import {FC, useState} from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import EventBlock from '../../../../components/EventBlock/EventBlock';

import './ListrecEvents.css';

const ListRecEvents: FC<{events: any}> = ({events}) => {
    const [isActiveRecEvents, setIsActiveRecEvents] = useState(true);

    function updateActiveRecEvents() {
        setIsActiveRecEvents(isActiveMyEvents => !isActiveMyEvents);
    }

    return (<>
        <SectionTitle func={updateActiveRecEvents}>Редомендации</SectionTitle>
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
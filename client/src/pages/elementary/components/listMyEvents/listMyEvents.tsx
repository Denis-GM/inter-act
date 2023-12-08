import {FC, useState} from 'react';
import SectionTitle from '../../../../shared/SectionTitle/SectionTitle';

import './ListMyEvents.css';
import EventBlock from '../../../../shared/EventBlock/EventBlock';

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
        <EventBlock key={event.id} event={event}></EventBlock>
      )
    )}
  </div>
  }
  </>)
};

export default ListMyEvents;
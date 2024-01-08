import {FC, useState} from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import EventBlock from '../../../../components/EventBlock/EventBlock';

import './ListMyEvents.css';

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
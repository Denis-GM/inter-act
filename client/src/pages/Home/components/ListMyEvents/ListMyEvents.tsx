import {FC, useState} from 'react';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import EventBlock from '../../../../components/EventBlock/EventBlock';

import './ListMyEvents.css';

const ListMyEvents: FC<{title: string, events: any}> = ({title, events}) => {
  const [isActiveMyEvents, setIsActiveMyEvents] = useState(true);

  function updateActiveMyEvents() {
    setIsActiveMyEvents(isActiveMyEvents => !isActiveMyEvents);
  }

  return (<>
  <SectionTitle func={updateActiveMyEvents}>{title}</SectionTitle>
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
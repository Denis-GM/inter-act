import {FC, useState} from 'react';
import SectionTitle from '../SectionTitle/SectionTitle';
import EventBlock from '../EventBlock/EventBlock';

import './ListMyEvents.css';

const ListMyEvents: FC<{title: string, events: any, canEdit?: boolean}> = ({title, events, canEdit}) => {
  const [isActiveMyEvents, setIsActiveMyEvents] = useState(true);

  function updateActiveMyEvents() {
    setIsActiveMyEvents(isActiveMyEvents => !isActiveMyEvents);
  }

  return (<>
  <SectionTitle func={updateActiveMyEvents}>{title}</SectionTitle>
  {isActiveMyEvents && 
    <div className='content'>
      {events.map((event: any) => (
          <EventBlock canEdit={canEdit} key={event.id} event={event}></EventBlock>
        )
      )}
    </div>
  }
  </>)
};

export default ListMyEvents;
import {FC, useState, useEffect} from 'react';
import axios from 'axios';
import ListMyEvents from './components/ListMyEvents/ListMyEvents';
import ListRecEvents from './components/ListRecEvents/ListrecEvents';
import SectionTitle from '../../shared/SectionTitle/SectionTitle';

import './elementary.css';

const Elementary: FC = () => {
  const [events, setEvents] = useState<any>([]);

  async function getEvents() {
    try {
      const res = await axios.get('/api/events/');
      setEvents(res.data);
      console.log(res.data);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
      getEvents();
  }, [])


  return (
    <div className='main-container'>
      <div className='input-city'>Город / Екатеринбург</div>
      <section className='section my-events-section'>
        { events && <ListMyEvents events={events} />}
      </section>
      <section className='section'>
        <SectionTitle text="Редомендации" />
        {/* { events && <ListRecEvents events={events} />} */}
      </section>
      <section className='section'>
        <SectionTitle text="Популярные подборки" />
      </section>
    </div>
  )
}

export default Elementary;
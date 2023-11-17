import {FC, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import ListMyEvents from './components/listMyEvents/listMyEvents';
import './elementary.css' 
import ListRecEvents from './components/listRecEvents/listrecEvents';

const Elementary: FC = () => {
  const [events, setEvents] = useState<any>([]);

  async function getEvents() {
    await axios.get('/api/events/')
        .then((res: any) =>{
            setEvents(res.data);
            console.log(res.data);
        })
        .catch((err: Error) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getEvents();
    }, [])


  return (
      <>
        <div className='main-container'>
          <div className='input-city'>Город / Екатеринбург</div>
          <section className='section my-events-section'>
            { events && <ListMyEvents events={events} />}
          </section>
          <section className='section'>
            { events && <ListRecEvents events={events} />}
          </section>
          <section className='section'>
              <h2>Популярные подборки</h2>
          </section>
        </div>
      </>
  )
}

export default Elementary;
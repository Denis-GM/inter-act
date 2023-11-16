import {FC, useState, useEffect} from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import ListMyEvents from './components/listMyEvents/listMyEvents';
import './elementary.css' 

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
            <section className='section my-events-section'>
                { events && <ListMyEvents events={events} />}
            </section>
            <section className='section'>
                <h2>Редомендации</h2>
            </section>
            <section className='section'>
                <h2>Подборки</h2>
            </section>
        </div>
        {/* <Outlet /> */}
      </>
  )
}

export default Elementary;
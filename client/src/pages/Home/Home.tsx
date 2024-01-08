import {FC, useState, useEffect} from 'react';
import axios from 'axios';
import ListMyEvents from './components/ListMyEvents/ListMyEvents';
import ListRecEvents from './components/ListRecEvents/ListrecEvents';
import SectionTitle from '../../components/SectionTitle/SectionTitle';

import './Home.css';

const Elementary: FC = () => {
    const [events, setEvents] = useState<any>();
    const [recEvents, setRecEvents] = useState<any>([]);

    async function getRecEvents() {
        try {
        const res = await axios.get('/api/events/');
        setRecEvents(res.data);
        console.log(res.data);
        }
        catch(err){
        console.log(err);
        }
    };

    useEffect(() => {
        getRecEvents();
    }, [])


    return (
        <div className='main-container'>
        <div className='inputCity'>Город / Екатеринбург</div>
        { events && 
            <section className='section'>
            <ListMyEvents events={events} />
            </section>}
        <section className='section'>
            { recEvents && <ListRecEvents events={recEvents} />}
        </section>
        <section className='section'>
            <SectionTitle text="Популярные подборки" />
        </section>
        </div>
    )
}

export default Elementary;
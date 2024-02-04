import {FC, useState, useEffect} from 'react';
import axios from 'axios';
import ListMyEvents from '../../components/ListMyEvents/ListMyEvents';

import './Home.css';

const Elementary: FC = () => {
    const [events, setEvents] = useState<any>();
    const [idUser, setidUser] = useState<any>(localStorage.getItem('id'));
    
    const [myEvents, setMyEvents] = useState<any>([]);
    const [myEventsSub, setMyEventsSub] = useState<any>([]);
    const [recEvents, setRecEvents] = useState<any>([]);

    useEffect(() => {
        getMyEvents();
        getMyEventsSub();
        getRecEvents();
    }, [])

    async function getMyEvents() {
		try {
            const res = await axios.get('/api/myEvents/' + idUser);
            console.log(res.data)
            setMyEvents(res.data);
		}
        catch(err) {
            console.log(err);
        }
	};

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

    async function getMyEventsSub() {
		try {
            const res = await axios.get('/api/myEventsSub/' + idUser);
            setMyEventsSub(res.data);
            console.log(res.data);
		}
        catch(err) {
            console.log(err);
        }
	};


    return (
        <div className='main-container'>
            <div className='inputCity'>Город / Екатеринбург</div>
            { myEvents && myEvents.length > 0  && 
                <section className='section'>
                    <ListMyEvents title='Созданные мероприятия' canEdit={true} events={myEvents} />
                </section>
            }
            { myEventsSub && myEventsSub.length > 0 && 
                <section className='section'>
                    <ListMyEvents title='Мои подписки' events={myEventsSub} />
                </section>
            }
            <section className='section'>
                { recEvents && <ListMyEvents title='Редомендации' events={recEvents} />}
            </section>
        </div>
    )
}

export default Elementary;
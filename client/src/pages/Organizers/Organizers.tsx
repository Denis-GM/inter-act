import {FC, useEffect, useState} from 'react';
import axios from 'axios';

import Search from '../../components/Search/Search';
import EventBlock from '../../components/EventBlock/EventBlock';
import { ConfigProvider, Pagination, Skeleton } from 'antd';

import './Organizers.css';

interface IOrganizers{
    isSearch?: boolean
}

const Organizers: FC<IOrganizers> = ({isSearch = true}) => {
    const [recEvents, setRecEvents] = useState<any>([]);
    const [recEventsPagination, setRecEventsPagination] = useState<any>([]);
  
    useEffect(() => {
        getRecEvents();
    }, [])

    function search(el: any) {
        let value = el.target.value.toLowerCase()
        let filterCollections = recEvents.filter((el: any) => el.title.toLowerCase().includes(value))
        if(value != '') 
            setRecEvents(filterCollections);
        else
            getRecEvents();
      }

    async function getRecEvents() {
        try {
            const res = await axios.get('/api/events/');
            let data: any = res.data.slice(0, 6);
            setRecEvents(res.data);
            setRecEventsPagination(data)
            console.log(res.data);
        }
        catch(err){
            console.log(err);
        }
    };

    function paginationFilter(page: number, pageSize: number) {
        const start = (page - 1) * pageSize - 1 < 0 ? (page - 1) * pageSize : (page - 1) * pageSize - 1;
        const end = recEvents.length < (page) * pageSize ? recEvents.length : (page) * pageSize;
        setRecEventsPagination((el: any) => el = recEvents.slice(start, end))
    }

    return(<>
        { isSearch && 
            <form className="c-form" style={{marginBottom: '40px'}}>
                <input type="search" placeholder="Поиск по названию"
                    className="search" onChange={el => search(el)} name="search"/>
            </form>
        }
        <div className='main-container'>
            { recEventsPagination && recEventsPagination.length > 0 &&
                <section className='section'>
                    <div className='content'>
                        {recEventsPagination.map((event: any) => (
                            <EventBlock key={event.id} event={event}></EventBlock>)
                        )}
                    </div>
                </section>
            }
            { !recEventsPagination || recEventsPagination.length == 0 &&
                <Skeleton active />
            }       
        </div>
        <div className='pagination-container'>
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            colorPrimary: '#5050ceb3',
                            colorPrimaryHover: '#5050ceb3',
                        },
                    },
                }}
            >
                <Pagination 
                    defaultCurrent={1} 
                    total={recEvents.length} 
                    defaultPageSize={6} 
                    onChange = {
                        (page, pageSize) => {
                            paginationFilter(page, pageSize)
                        }
                    }
                />
            </ConfigProvider>
        </div>
    </>)
}

export default Organizers;
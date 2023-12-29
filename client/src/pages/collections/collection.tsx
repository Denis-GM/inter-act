import {FC, useEffect, useState} from 'react';
import Search from '../../shared/Search/Search';
import axios from 'axios';
import BlockCollection from './components/BlockCollection/BlockCollection';

import { Pagination } from 'antd';

import './Collections.css';

const Collections: FC = () => {
  // const [textSearch, setTextSearch] = useState<string>('');
  const [collections, setCollections] = useState<any>([]);
  const [collectionsServer, setCollectionsServer] = useState<any>([]);

  function search(el: any) {
    let value = el.target.value.toLowerCase()
    // setTimeout(() => setTextSearch(value), 500);
    let filterCollections = collectionsServer.filter((el: any) => el.title.toLowerCase().includes(value))
    if(value != '') 
      setCollections(filterCollections);
    else
      setCollections(collectionsServer);
  }

  async function getCollections() {
    try {
      const res = await axios.get('/api/collections/');
      setCollections(res.data);
      setCollectionsServer(res.data);
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getCollections();
  }, [])

  return (
    <div className='main-container'>
      {/* <Search func={setTextSearch}></Search> */}
      <form className="c-form">
        <input type="search" placeholder="Поиск по названию"
            className="search" onChange={el => search(el)} name="search"/>
      </form>
      <div className='collections-container'>
        {collections.map((collection: any) => (
          <BlockCollection key={collection.id} collection={collection} />)
        )}
      </div>
      <Pagination defaultCurrent={1} total={50} defaultPageSize={1} />
    </div>
  )
}

export default Collections;
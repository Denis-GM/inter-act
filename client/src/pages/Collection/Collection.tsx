import {FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { ConfigProvider, Pagination } from 'antd';

import './Collection.css';
import ImageBox from '../../components/ImageBox/ImageBox';
import Organizers from '../Organizers/Organizers';

const Collection: FC = () => {
  const [collection, setCollection] = useState<any>([]);
  const { id } = useParams();

  useEffect(() => {
    getCollections();
  }, [])

  async function getCollections() {
    try {
      const res = await axios.get('/api/collection/' + id);
      setCollection(res.data);
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className='main-container'>
        {collection.photo && 
            <div className='collection-img'>
                <ImageBox data={collection.photo.data} hand={true} className='block-event__img'></ImageBox>
            </div>
        }
        <div className='title-collection'>{collection.title}</div>
        <div style={{marginTop: '40px'}}>
            <Organizers isSearch={false}></Organizers>
        </div>
    </div>
  )
}

export default Collection;
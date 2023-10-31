import {FC, useState, useEffect} from 'react';
import api from '../../core/core-settings';
import { Outlet } from 'react-router-dom';

const Elementary: FC = () => {
  const [data, setData] = useState<any>(null);

  const fetchData = async () => {
    fetch(`${api.serverUrl}/api/products`)
      .then(response => {
        if(response.ok)
          return response.json()
        throw response
      })
      .then((data: any) => {
        setData(data.data)
        console.log(data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, []);


  return (
      <>
        <div>
        {data ? data.map((item: any) => (
          <div key={item.Id}>{item.Id} {item.Title}</div>)) 
          : <div>Loading...</div>
        }
        </div>
        <Outlet />
      </>
  )
}

export default Elementary;
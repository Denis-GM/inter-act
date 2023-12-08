import {FC, useState} from 'react';
import Search from '../../shared/Search/Search';

const Collections: FC = () => {
    const [textSearch, setTextSearch] = useState<string>('');

    function search(el: any) {
      let value = el.target.value
      setTextSearch(value);
      console.log(value);
    }

    return (
        <>
        <div className='main-container'>
            {/* <Search func={setTextSearch}></Search> */}
            <form className="c-form">
              <input type="search" placeholder="Поиск по названию"
                 className="search" onChange={el => search(el)} name="search"/>
            </form>
          Collections
        </div>
        </>
    )
}

export default Collections;
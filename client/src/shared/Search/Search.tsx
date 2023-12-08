import {FC, HTMLProps} from 'react';
import './Search.css';

interface ISearch extends HTMLProps<HTMLInputElement> {

}

const Search: FC<ISearch> = ({...props}) => {
  return(
    <div >
      <input type="search" />
    </div>
  )
}

export default Search;
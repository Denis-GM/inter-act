import {FC, HTMLProps} from 'react';
import './Search.css';

interface ISearch extends HTMLProps<HTMLInputElement> {
  func?: any
}

const Search: FC<ISearch> = ({func, ...props}) => {
  return(
    <div {...props}>
      <form className="c-form">
        <input type="search" placeholder="Поиск по названию"
          className="search" onChange={func} name="search"/>
      </form>
    </div>
  )
}

export default Search;
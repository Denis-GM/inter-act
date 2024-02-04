import {FC, useEffect, useRef, useState} from 'react';
import ImageBox from '../../../../components/ImageBox/ImageBox';

import './BlockCollection.css';
import styles from './BlockCollection.css';
import { Link } from 'react-router-dom';

interface IBlockCollection {
  collection: any
}

const BlockCollection: FC<IBlockCollection> = ({collection}) => {
    return (
        <Link className='block-collection' to={'/collection/' + collection.id}>
            <ImageBox data={collection.photo.data} hand={true} className='block-collection__img' />
            <h3 className='block-collection_h'>{collection.title}</h3>
        </Link>
    )
}

export default BlockCollection;
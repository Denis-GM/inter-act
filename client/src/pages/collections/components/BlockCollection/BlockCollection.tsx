import {FC, useEffect, useRef, useState} from 'react';
import ImageBox from '../../../../components/ImageBox/ImageBox';

import './BlockCollection.css';
import styles from './BlockCollection.css';

interface IBlockCollection {
  collection: any
}

const BlockCollection: FC<IBlockCollection> = ({collection}) => {
  // const [photo, setPhoto] = useState<any>();
  // const imgRef = useRef(null);

    useEffect(() => {
      // let reader = new FileReader();
      // reader.readAsDataURL(new Blob([new Uint8Array(collection.photo.data)], 
      //   { type: "image/jpg" }));
      // reader.onloadend = function() {
      //   setPhoto(reader.result)
      // }
    }, [])

    return (
        <div className='block-collection'>
            <ImageBox data={collection.photo.data} hand={true} className='block-collection__img' />
            <h3 className='block-collection_h'>{collection.title}</h3>
        </div>
    )
}

export default BlockCollection;
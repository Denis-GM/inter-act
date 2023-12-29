import {FC, useEffect, useRef, useState} from 'react';
import './BlockCollection.css';

interface IBlockCollection {
  collection: any
}

const BlockCollection: FC<IBlockCollection> = ({collection}) => {
  const [photo, setPhoto] = useState<any>();
  const imgRef = useRef(null);

  useEffect(() => {
    // previewFile()
    var reader = new FileReader();
    reader.readAsDataURL(new Blob([new Uint8Array(collection.photo.data)], 
      { type: "image/jpg" }));
    reader.onloadend = function() {
      setPhoto(reader.result)
    }
  }, [])

  function previewFile() {
    const file = collection.photo.data;
    const reader = new FileReader();
  
    reader.addEventListener(
      "load",
      () => {
        let result = reader.result as string;
        // result = result.replace('application/octet-stream', 'image/jpg');
        imgRef.current!.src = result;
        setPhoto(reader.result)
      },
      false,
    );
  
    if (file) {
      reader.readAsDataURL(new Blob(file, { type: "image/jpg" }));
    }
  }

  return (
    <div className='block-collection'>
      <img ref={imgRef} src={photo} className='block-collection__img' />
      <h3 className='block-collection_h'>{collection.title}</h3>
    </div>
  )
}

export default BlockCollection;
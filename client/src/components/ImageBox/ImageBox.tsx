import {FC, useEffect, useState} from 'react';

import './ImageBox.css'

interface IImageBox {
    data: any,
    alt?: string,
    className?: string,
}

const ImageBox: FC<IImageBox> = ({data, alt = '', className = ''}) => {
    const [photo, setPhoto] = useState<any>();
  
    useEffect(() => {
        let reader = new FileReader();
        reader.readAsDataURL(new Blob([new Uint8Array(data)], 
            { type: "image/jpg" }));
        reader.onloadend = function() {
            setPhoto(reader.result)
        }
    }, [])

    return (
        <img src={photo} alt={alt} className={`${className}`} />
    )
}

export default ImageBox;
import {FC, useEffect, useState} from 'react';

import './ImageBox.css'

interface IImageBox {
    data: any,
    hand?: boolean,
    alt?: string,
    className?: string,
}

const ImageBox: FC<IImageBox> = ({data, hand = false, alt = '', className = 'block-collection__img'}) => {
    const [photo, setPhoto] = useState<any>();
  
    useEffect(() => {
        if(hand) {
            let reader = new FileReader();
            reader.readAsDataURL(new Blob([new Uint8Array(data)], 
                { type: "image/jpg" }));
            reader.onloadend = function() {
                setPhoto(reader.result)
            }
        }
    }, [])

    return (
        <>
            {!hand ? <img src={data} alt={alt} className={`${className}`} /> :
            <img src={photo} alt={alt} className={`${className}`} />}
        </>
    )
}

export default ImageBox;
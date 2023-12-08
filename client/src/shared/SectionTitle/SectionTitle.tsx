import { FC, useState } from 'react';
import './SectionTitle.css';

const SectionTitle: FC<{text: string, func?: () => void}> = ({text, func}) => {
    return(
    <h2 className='event-title' onClick={func}>{text}</h2>
    );
}

export default SectionTitle;
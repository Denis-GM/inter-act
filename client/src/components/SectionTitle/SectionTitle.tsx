import { Children, FC, HTMLProps } from 'react';
import './SectionTitle.css';

export interface IHeading extends HTMLProps<HTMLHeadingElement>{
    func?(): void
}

const SectionTitle: FC<IHeading> = ({func, ...props}) => {
    return(
        <h2 className='event-title' onClick={func}>{props.children}</h2>
    );
}

export default SectionTitle;
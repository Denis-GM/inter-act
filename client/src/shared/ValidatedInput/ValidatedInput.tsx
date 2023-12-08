import { FC, HTMLProps } from "react";
import { forwardRef } from 'react';
import './validatedInput.css';

export interface IInputProps extends HTMLProps<HTMLInputElement>{
    text: string,
    validated?: boolean 
}

type InputProps = React.HTMLProps<HTMLInputElement>

const ValidatedInput = forwardRef<HTMLInputElement | InputProps, IInputProps>(
    ({text, validated, ...props}: IInputProps , ref: React.ForwardedRef<any>): JSX.Element => {
    return(
        <div className="label">
            <div className="text">{text}</div>
            <div className="input-block">
                <input {...props} className="input" ref={ref}/>
                { validated && <div className="indicator"></div>}
            </div>
        </div>
    )
})

export default ValidatedInput;
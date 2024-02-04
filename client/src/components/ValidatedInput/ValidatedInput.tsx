import { FC, HTMLProps } from "react";
import { forwardRef } from 'react';
import './validatedInput.css';

export interface IInputProps extends HTMLProps<HTMLInputElement>{
    text: string,
    isRequired?: boolean,
}

type InputProps = React.HTMLProps<HTMLInputElement>

const ValidatedInput = forwardRef<HTMLInputElement | InputProps, IInputProps>(
    ({text, isRequired = false, ...props}: IInputProps , ref: React.ForwardedRef<any>): JSX.Element => {
    return(
        <div className="label">
            <div className="text">
                {text}
                {isRequired && <span style={{color: 'red', marginLeft: '5px'}}>*</span>}
            </div>
            <div className="input-block">
                <input {...props} className="input" ref={ref}/>
            </div>
        </div>
    )
})

export default ValidatedInput;
import React from 'react'
import s from './FormControl.module.scss'

const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
        <div className={s.formControl}>
            <div className={s.formControlChild + ' ' + (hasError ? s.error : '')}>
                {props.children}
            </div>
            { hasError && <span className={s.errorText}>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}>
            <textarea {...props.input} {...restProps}/>
        </FormControl>
    )
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}>
            <input {...props.input} {...restProps}/>
        </FormControl>
    )
}


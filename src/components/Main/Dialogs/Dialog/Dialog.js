import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Dialog.module.scss';

const Dialog = (props) => {
    let path = "/dialogs/" + props.id
    return (
        <NavLink to={path}>
            <div className={s.dialog}>
                <span>{props.name}</span>
            </div>
        </NavLink>
    )
}

export default Dialog
import React from 'react'
import s from './Auth.module.scss'
import AboutMe from './AboutMe/AboutMe'

const Auth = (props) => {
    return (
        <div className={s.loginBlock}>
            {props.isAuth ? <AboutMe logout={props.logout}/> : <div></div>}
        </div>
    )
}

export default Auth


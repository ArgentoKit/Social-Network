import React from 'react'
import s from './AboutMe.module.scss'
import ava from '../../../img/ava.jpg'

const AboutMe = (props) => {
    return (
        <div className={s.info}>
            <img className={s.avatar} src={ava} alt="avatar" />
            <span className={s.name}>Aleksandr Markov</span>
            <span className={s.user}>@argentokit</span>
            <div className={s.logoutBlock}>
                <button className={s.logout} onClick={props.logout}>Log out</button>
            </div>
        </div>
    )
}

export default AboutMe
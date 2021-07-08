import React from 'react'
import s from './Users.module.scss'
import userAva from '../../../img/user.jpg'
import { NavLink } from 'react-router-dom'

const User = ({user, ...props}) => {
    return (
        <div className={s.user} key={user.id}>
            <NavLink to={'/profile/' + user.id}>
                <img className={s.avatar} src={user.photos.small != null ? user.photos.small : userAva} alt="avatar" />
            </NavLink>
            <div className={s.info}>
                <div className={s.name}>{user.name}</div>
                <div className={s.status}>{user.status}</div>
                <div className={s.location}>{user.aboutMe}</div>
            </div>
            <div className={s.follow}>
                {user.followed
                    ? <button className={s.button__unfollow} disabled={props.props.followingProgress.some(id => id === user.id)}
                        onClick={() => { props.unfollow(user) }}>Unfollow</button>
                    : <button className={s.button__follow} disabled={props.props.followingProgress.some(id => id === user.id)}
                        onClick={() => { props.follow(user) }}>Follow</button>}
            </div>
        </div>
    )
}

export default User
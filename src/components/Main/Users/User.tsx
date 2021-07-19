import React from 'react'
import s from './Users.module.scss'
import userAva from '../../../img/user.jpg'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../../types/types'

type PropsType = {
    user: UserType
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const User: React.FC<PropsType> = ({user, follow, unfollow, followingProgress}) => {
    const userId = user.id
    debugger
    return (
        <div className={s.user} key={userId}>
            <NavLink to={'/profile/' + userId}>
                <img className={s.avatar} src={user.photos.small != null ? user.photos.small : userAva} alt="avatar" />
            </NavLink>
            <div className={s.info}>
                <div className={s.name}>{user.name}</div>
                <div className={s.status}>{user.status}</div>
            </div>
            <div className={s.follow}>
                {user.followed
                    ? <button className={s.button__unfollow} disabled={followingProgress.some(id => id === userId)}
                        onClick={() => { unfollow(userId) }}>Unfollow</button>
                    : <button className={s.button__follow} disabled={followingProgress.some(id => id === userId)}
                        onClick={() => { follow(userId) }}>Follow</button>}
            </div>
        </div>
    )
}

export default User
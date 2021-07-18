import React from 'react'
import s from './Users.module.scss'
import Paginator from './Paginator'
import User from './User'
import { UserType } from '../../../types/types'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (p: number) => void
    users: Array<UserType>
    followingProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged, users, follow, unfollow, followingProgress}) => {
    return (
        <div className={s.users}>
            <Paginator  totalItemsCount={totalUsersCount} 
                        pageSize={pageSize} 
                        currentPage={currentPage} 
                        onPageChanged={onPageChanged}/>
            <div> 
            {
                users.map(user => <User user={user} 
                                        follow={follow}
                                        unfollow={unfollow}
                                        followingProgress={followingProgress}
                                        key={user.id}/>)
            }
            </div>
        </div>
    )    
}

export default Users
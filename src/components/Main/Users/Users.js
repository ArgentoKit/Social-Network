import React from 'react'
import s from './Users.module.scss'
import Paginator from './Paginator'
import User from './User'

const Users = (props) => {
    return (
        <div className={s.users}>
            <Paginator  totalItemsCount={props.totalUsersCount} 
                        pageSize={props.pageSize} 
                        currentPage={props.currentPage} 
                        onPageChanged={props.onPageChanged}/>
            <div> 
            {
                props.users.map(user => <User user={user} props={props} key={user.id}/>)
            }
            </div>
        </div>
    )    
}

export default Users
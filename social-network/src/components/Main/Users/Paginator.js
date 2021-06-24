import React from 'react'
import s from './Users.module.scss'

const Paginator = (props) => {
    let selected = s.page + ' ' + s.select
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={s.users}>
            <div>
                <ul className={s.navigation}>
                    {pages.map( p => {
                        return <li className={props.currentPage === p ? selected : s.page} 
                        onClick={(e) => {props.onPageChanged(p)}}>{p}</li>
                    })}
                </ul>
            </div>
        </div>
    )    
}

export default Paginator
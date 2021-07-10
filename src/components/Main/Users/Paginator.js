import React, { useState } from 'react'
import s from './Users.module.scss'
import cn from 'classnames'

const Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rightPortionPageNumber = portionNumber * portionSize

    return (
        <div className={s.users}>
            <div>
                <ul className={s.navigation}>
                    {portionNumber > 1 && <button className={s.prev} onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
                    {pages
                        .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                        .map(p => {
                            return <li key={p} className={cn(s.page, {
                                [s.select]: currentPage === p
                            })} onClick={(e) => { onPageChanged(p) }}>{p}</li>
                        })}
                    {portionCount > portionNumber &&
                        <button className={s.next} onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
                </ul>
            </div>
        </div>
    )
}

export default Paginator
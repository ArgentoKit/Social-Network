import React from 'react';
import s from './post.module.scss';
import ava from '../../../../../img/ava.jpg'

type PropsType = {
    message: string
}

const Post: React.FC<PropsType> = ({message}) => {
    
    return (
        <div className={s.post}>
            <img className={s.ava} src={ava} alt="image" />
            <p className={s.text}>{message}</p>
        </div>
    )
}

export default Post;
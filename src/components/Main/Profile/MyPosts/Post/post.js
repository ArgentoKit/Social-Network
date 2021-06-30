import React from 'react';
import s from './post.module.scss';
import ava from '../../../../../img/ava.jpg'

const Post = (props) => {
    
    return (
        <div className={s.post}>
            <img className={s.ava} src={ava} alt="image" />
            <p className={s.text}>{props.message}</p>
        </div>
    )
}

export default Post;
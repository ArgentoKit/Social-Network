import React from 'react';
import style from './profile.module.scss';
import head from '../../../img/head.png';
import { Info } from './Info/info';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        <div className={style.profile}>
            <div className={style.profile__inner}>
                <header className={style.header}>
                    <img className={style.header__img} src={head} alt="image"/>
                </header>
                <div className={style.content}>
                    <Info profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
                    <MyPostsContainer />
                </div>
            </div>
        </div>
    );
}

export default Profile;
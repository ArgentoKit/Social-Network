import React from 'react';
import style from './info.module.scss';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatus from './ProfileStatus'
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

export const Info = (props) => {
    if(!props.profile) {
        return <Preloader />
    } else {
        return (
            <div className={style.info}>
                <img className={style.avatar} src={props.profile.photos.large} alt="image" />
                <div className={style.description}>
                    <span className={style.name}>{props.profile.fullName}</span>
                    <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                    <span className={style.online}>online</span>
                </div>
            </div>
        );
    }
}
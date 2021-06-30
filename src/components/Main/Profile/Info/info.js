import React from 'react';
import style from './info.module.scss';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userAvatar from '../../../../img/avatar.png'

export const Info = (props) => {
    if(!props.profile) {
        return <Preloader />
    }

    const onAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar(e.target.files[0])
        }
    }
    
    return (
        <div className={style.info}>
            <img className={style.avatar} src={props.profile.photos.large || userAvatar} alt="image" />
            <div className={style.description}>
                <span className={style.name}>{props.profile.fullName}</span>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                <span className={style.online}>online</span>
            </div>
            <div className={style.upload}>{ props.isOwner && <input type={'file'} onChange={onAvatarSelected}/> }</div>
        </div>
    );
}
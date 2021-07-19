import React from 'react';
import style from './profile.module.scss';
import head from '../../../img/head.png';
import { Info } from './Info/info';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { FormProfileDataType, ProfileType } from '../../../types/types';

type PropsType = {
    isOwner: boolean
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    saveAvatar: (file: any) => void
    saveProfile: (formData: FormProfileDataType) => void
}

const Profile: React.FC<PropsType> = ({isOwner, profile, status, updateStatus, saveAvatar, saveProfile}) => {
    return (
        <div className={style.profile}>
            <div className={style.profile__inner}>
                <header className={style.header}>
                    <img className={style.header__img} src={head} alt="image"/>
                </header>
                <div className={style.content}>
                    <Info   isOwner={isOwner} 
                            profile={profile} 
                            status={status} 
                            updateStatus={updateStatus}
                            saveAvatar={saveAvatar}
                            saveProfile={saveProfile}/>
                    <MyPostsContainer />
                </div>
            </div>
        </div>
    );
}

export default Profile;
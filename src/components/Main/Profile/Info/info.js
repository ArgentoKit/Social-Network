import React, { useState } from 'react';
import style from './info.module.scss';
import Preloader from '../../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userAvatar from '../../../../img/avatar.png'
import ProfileDataReduxForm from './ProfileDataForm';

export const Info = (props) => {
    let [editMode, setEditMode] = useState(false)

    const activateEditMode = () => {
        setEditMode(true)
    }

    if (!props.profile) {
        return <Preloader />
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData)
        setEditMode(false)
    }

    const onAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvatar(e.target.files[0])
        }
    }

    return (
        <div className={style.info}>
            <img className={style.avatar} src={props.profile.photos.large || userAvatar} alt="image" />
            {editMode   ? <ProfileDataReduxForm initialValues={props.profile}
                                                onSubmit={onSubmit} />
                        : <ProfileData  profile={props.profile}
                                status={props.status}
                                updateStatus={props.updateStatus}
                                isOwner={props.isOwner}
                                activateEditMode={activateEditMode} />}
            <div className={style.changePhoto}>
                <label className={style.upload}>
                    {props.isOwner && <input type={'file'} onChange={onAvatarSelected} />}
                    Change avatar
                </label>
            </div>
        </div>
    );
}

const ProfileData = ({ profile, status, updateStatus, isOwner, activateEditMode }) => {
    return (
        <div className={style.description}>
            <span className={style.name}>{profile.fullName}</span>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            <div><span className={style.bold}>About me: </span>{profile.aboutMe}</div>
            <div><span className={style.bold}>Contacts: </span>{Object.keys(profile.contacts).map(key => {
                return (
                    <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                )
            })}</div>
            <div>
                <span className={style.bold}>Looking for a job: </span> {profile.lookingForAJob ? 'yes' : 'no'}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <span className={style.bold}>My professional skills: </span> {profile.lookingForAJobDescription}
                </div>
            }
            {isOwner && <button className={style.editInfo} onClick={activateEditMode}>Edit info</button>}
        </div>
    )
}


const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={style.contactKey}>
            {contactTitle} : {contactValue}
        </div>
    )
}
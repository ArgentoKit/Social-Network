import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from '../../../common/FormControl/FormControl';
import style from './info.module.scss';

const ProfileDataForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <span>
                <Field component={Input} name={'fullName'} placeholder={'FullName'} />
            </span>
            <div>
                <Field component={Textarea} name={'aboutMe'} placeholder={'AboutMe'} />
            </div>
            <div>
                <span className={style.bold}>Looking for a job: </span>
                <Field component={Input} type='checkbox' name={'lookingForAJob'} />
            </div>
            <div>
                <span className={style.bold}>My professional skills: </span>
                <Field component={Textarea} name={'lookingForAJobDescription'} placeholder={'My professional skills'}/>
            </div>
            
            <button className={style.editInfo}>Save</button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({
    form: 'editProfileData'
})(ProfileDataForm)

export default ProfileDataReduxForm
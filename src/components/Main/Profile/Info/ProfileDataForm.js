import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Input, Textarea } from '../../../common/FormControl/FormControl';
import style from './info.module.scss';

const ProfileDataForm = ({profile, handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <span>
                <Field component={Input} name={'FullName'} placeholder={'FullName'} />
            </span>
            <div>
                <Field component={Textarea} name={'AboutMe'} placeholder={'AboutMe'} />
            </div>
            
            <button className={style.editInfo}>Save</button>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({
    form: 'editProfileData'
})(ProfileDataForm)

export default ProfileDataReduxForm
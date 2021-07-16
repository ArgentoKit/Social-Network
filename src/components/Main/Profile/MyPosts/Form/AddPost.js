import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../../common/FormControl/FormControl';
import s from './AddPost.module.scss';

const AddPost = (props) => {
    let onAddPost = values => {
        props.addPost(values.newPostText)
    }

    return (
        <AddPostReduxForm onSubmit={onAddPost}/>
    )
}

const AddPostForm = (props) => {
    return (
        <form className={s.form} onSubmit={props.handleSubmit}>
            <Field  className={s.postTextarea}
                    component={Textarea}
                    name='newPostText' 
                    placeholder='post text'/>
            <div className={s.button}>
                <button className={s.addpost}>Add Post</button>
            </div>
        </form>
    )
}

const AddPostReduxForm = reduxForm({
    form: 'addPost'
})(AddPostForm)

export default AddPost;
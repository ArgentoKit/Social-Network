import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../../../redux/profile-reducer';
import AddPost from './AddPost';

let mapStateToProps = (state) => {
    return {
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },
    }
}

const FormContainer = connect(mapStateToProps, mapDispatchToProps)(AddPost)

export default FormContainer;
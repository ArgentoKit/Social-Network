import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../../redux/profile-reducer';
import MyPosts from './myposts';

let mapStateToProps = (state) => {
    return {
        postsData: state.profilePage.postsData,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostActionCreator(newPostText))
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
import React from 'react';
import { connect } from 'react-redux';
import { addPostActionCreator } from '../../../../redux/profile-reducer';
import { AppStateType } from '../../../../redux/redux-store';
import MyPosts from './myposts';



let mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}
let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText))
        },
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
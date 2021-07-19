import React from 'react';
import { PostsType } from '../../../../types/types';
import FormContainer from './Form/AddPostContainer';
import s from './myposts.module.scss';
import Post from './Post/post';

type PropsType = {
    postsData: Array<PostsType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = React.memo(props => {
    let postsElements = props.postsData.map(post => <Post message={post.message} key={post.id}/>)
    
    return (
        <div className={s.wall}>
            <h6 className={s.title}>My posts</h6>
            <FormContainer addPost={props.addPost} />
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    );
})

export default MyPosts;
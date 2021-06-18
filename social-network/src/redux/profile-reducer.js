import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'

let initialState = {
    postsData: [
        { id: 1, message: 'You are beatiful, you know?' },
        { id: 2, message: 'Nice photo' },
        { id: 3, message: 'How are you?' }
    ],
    profile: null,
    status: '',
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                message: action.newPostText
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case DELETE_POST:
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId)
            }
        default:
            return state

    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}
export const setStatus = (status) => {
    return {
        type: SET_STATUS,
        status
    }
}
export const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}
export const getUserProfile = (userId) => {
    return (
        (dispatch) => {
            profileAPI.getUserProfile(userId)
                .then(data => {
                    dispatch(setUserProfile(data))
                })
        }
    )
}
export const getStatus = (userId) => {
    return (
        (dispatch) => {
            profileAPI.getStatus(userId)
                .then(data => {
                    dispatch(setStatus(data))
                })
        }
    )
}
export const updateStatus = (status) => {
    return (
        (dispatch) => {
            profileAPI.updateStatus(status)
                .then(data => {
                    dispatch(setStatus(status))
        })
}
    )
}


export default profileReducer
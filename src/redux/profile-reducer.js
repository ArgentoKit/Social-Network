import { profileAPI } from "../api/api"

const ADD_POST = 'ADD-POST'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_AVATAR_SUCCESS = 'SAVE_AVATAR_SUCCESS'

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
        case SAVE_AVATAR_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
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
export const saveAvatarSuccess = (photos) => {
    return {
        type: SAVE_AVATAR_SUCCESS,
        photos
    }
}

export const getUserProfile = (userId) => {
    return (
        async (dispatch) => {
            let data = await profileAPI.getUserProfile(userId)
            dispatch(setUserProfile(data))
        }
    )
}
export const getStatus = (userId) => {
    return (
        async (dispatch) => {
            let data = await profileAPI.getStatus(userId)
            dispatch(setStatus(data))
        }
    )
}
export const updateStatus = (status) => {
    return (
        async (dispatch) => {
            let data = await profileAPI.updateStatus(status)
            dispatch(setStatus(status))
        }
    )
}
export const saveAvatar = (file) => {
    return (
        async (dispatch) => {
            let data = await profileAPI.saveAvatar(file)
            dispatch(saveAvatarSuccess(data.photos))
        }
    )
}


export default profileReducer
import { ThunkAction } from "redux-thunk"
import { profileAPI } from "../api/profile-api"
import { PhotosType, PostsType, ProfileType } from "../types/types"
import { AppStateType } from "./redux-store"

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
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
}

type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
                profile: {...state.profile, photos: {small: action.photos.small, large: action.photos.large}} as ProfileType
            }
        default:
            return state

    }
}

type ActionsType = AddPostActionCreatorType | SetUserProfileActionType | SetStatusActionType |
DeletePostActionType | SaveAvatarSuccessActionType

type AddPostActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText })

type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE,
        profile
    }
}

type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
export const setStatus = (status: string): SetStatusActionType => {
    return {
        type: SET_STATUS,
        status
    }
}

type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
export const deletePost = (postId: number): DeletePostActionType => {
    return {
        type: DELETE_POST,
        postId
    }
}

type SaveAvatarSuccessActionType = {
    type: typeof SAVE_AVATAR_SUCCESS
    photos: PhotosType
}
export const saveAvatarSuccess = (photos: PhotosType): SaveAvatarSuccessActionType => {
    return {
        type: SAVE_AVATAR_SUCCESS,
        photos
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType => {
    return (
        async (dispatch) => {
            let data = await profileAPI.getUserProfile(userId)
            dispatch(setUserProfile(data))
        }
    )
}
export const getStatus = (userId: number): ThunkType => {
    return (
        async (dispatch) => {
            let data = await profileAPI.getStatus(userId)
            dispatch(setStatus(data))
        }
    )
}
export const updateStatus = (status: string): ThunkType => {
    return (
        async (dispatch) => {
            try {
                let data = await profileAPI.updateStatus(status)
                dispatch(setStatus(status))
            } catch (error) {
                debugger
            }
        }
    )
}
export const saveAvatar = (file: any): ThunkType => {
    return (
        async (dispatch) => {
            let data = await profileAPI.saveAvatar(file)
            dispatch(saveAvatarSuccess(data.data.photos))
        }
    )
}
export const saveProfile = (profile: ProfileType): ThunkType => {
    return (
        async (dispatch, getState) => {
            const userId = getState().auth.id
            const data = await profileAPI.saveProfile(profile)
            // @ts-ignore:
            dispatch(getUserProfile(userId))
        }
    )
}


export default profileReducer
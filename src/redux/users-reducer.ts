import { followAPI, usersAPI } from "../api/api"
import { UserType } from "../types/types"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    followingProgress: [] as Array<number>, // array of users id
}

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: true }
                    }
                    return user
                })
            }
        case UNFOLLOW: {
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return { ...user, followed: false }
                    }
                    return user
                })
            }
        }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingProgress: action.isFetching
                    ? [...state.followingProgress, action.userId]
                    : state.followingProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state

    }
}

type FollowSuccessActionType = {
    type: typeof FOLLOW
    userId: number
}
export const followSuccess = (userId: number): FollowSuccessActionType => {
    return {
        type: FOLLOW,
        userId
    }
}

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => {
    return {
        type: UNFOLLOW,
        userId
    }
}

type SetUsersActionType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersActionType => {
    return {
        type: SET_USERS,
        users
    }
}

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
}

type SetTotalUsersCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalUsersCount
    }
}

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => {
    return {
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }
}

export const requestUsers = (currentPage: number, pageSize: number) => {
    return (
        async (dispatch: any) => {
            dispatch(toggleIsFetching(true))
            dispatch(setCurrentPage(currentPage))

            let data = await usersAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFetching(false))
            dispatch(setUsers(data.items))
            dispatch(setTotalUsersCount(data.totalCount))
        }
    )
}
const followUnfollorFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId))

    let data = await apiMethod(userId)
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId))
}

export const follow = (userId: number) => {
    return (
        async (dispatch: any) => {
            let apiMethod = followAPI.followUser.bind(followAPI)
            followUnfollorFlow(dispatch, userId, apiMethod, followSuccess)
        }
    )
}
export const unfollow = (userId: number) => {
    return (
        async (dispatch: any) => {
            let apiMethod = followAPI.unfollowUser.bind(followAPI)
            followUnfollorFlow(dispatch, userId, apiMethod, unfollowSuccess)
        }
    )
}

export default usersReducer
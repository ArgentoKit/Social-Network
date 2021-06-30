import React from 'react'
import { createSelector } from 'reselect'

const getUsersSelector = (state) => {
    return state.usersPage.users
}

export const getPageSize = (state) => {
    return state.usersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching
}

export const getFollowingProgress = (state) => {
    return state.usersPage.followingProgress
}

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(user => true)
})
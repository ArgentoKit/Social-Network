import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': 'c7d2be40-41ab-4b0f-b87f-66f943927757'}
})

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
}

export const profileAPI = {
    getUserProfile(userId) {
        return (
            instance.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    },
    saveAvatar(avatarFile) {
        const formData = new FormData()
        formData.append('image', avatarFile)
        return (
            instance.put(`/profile/photo`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
        )
    },
    saveProfile(profile) {
        return (
            instance.put(`profile`, profile)
        )
    }
}

export const authAPI = {
    authData() {
        return (
            instance.get(`auth/me`)
            .then(response => {
                return response.data
            })
        )
    },
    login(email, password, rememberMe = false) {
        return (
            instance.post(`auth/login`, {email, password, rememberMe})
            .then(response => {
                return response.data
            })
        )
    },
    logout() {
        return (
            instance.delete(`auth/login`)
            .then(response => {
                return response.data
            })
        )
    }
}

export const followAPI = {
    unfollowUser(user) {
        return (
            instance.delete(`follow/${user.id}`)
            .then(response => {
                return response.data
            })
        )
    },
    followUser(user) {
        return (
            instance.post(`follow/${user.id}`, {})
            .then(response => {
                return response.data
            })
        )
    }
}
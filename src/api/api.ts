import axios from "axios";
import { ProfileType } from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': '488d9ed6-8983-4e15-bb90-b44c4ccd3c88'}
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
    getUserProfile(userId: number) {
        return (
            instance.get(`profile/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    getStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
                .then(response => {
                    return response.data
                })
        )
    },
    updateStatus(status: string) {
        return (
            instance.put(`profile/status`, {status: status})
        )
    },
    saveAvatar(avatarFile: any) {
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
    saveProfile(profile: ProfileType) {
        return (
            instance.put(`profile`, profile)
        )
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data: { 
        id: number, 
        email: string, 
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginResponseType = {
    data: { 
        userId: number
    }
    resultCode: ResultCodesEnum | ResultCodeForCaptcha
    messages: Array<string>
}

export const authAPI = {
    authData() {
        return (
            instance.get<MeResponseType>(`auth/me`)
            .then(response => {
                return response.data
            })
        )
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return (
            instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
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
    unfollowUser(userId: number) {
        return (
            instance.delete(`follow/${userId}`)
            .then(response => {
                return response.data
            })
        )
    },
    followUser(userId: number) {
        return (
            instance.post(`follow/${userId}`, {})
            .then(response => {
                return response.data
            })
        )
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return (
            instance.get(`security/get-captcha-url`)
        )
    }
}
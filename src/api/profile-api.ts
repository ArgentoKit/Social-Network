import { PhotosType, ProfileType } from "../types/types"
import { instance, ResponseType } from "./api"

type SaveAvatarResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getUserProfile(userId: number) {
        return (
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    getStatus(userId: number) {
        return (
            instance.get<string>(`profile/status/${userId}`)
                .then(response => response.data)
        )
    },
    updateStatus(status: string) {
        return (
            instance.put<ResponseType>(`profile/status`, {status: status}).then(response => response.data)
        )
    },
    saveAvatar(avatarFile: File) {
        const formData = new FormData()
        formData.append('image', avatarFile)
        return (
            instance.put<ResponseType<SaveAvatarResponseType>>(`/profile/photo`, formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            })
        ).then(response => response.data)
    },
    saveProfile(profile: ProfileType) {
        return (
            instance.put<ResponseType>(`profile`, profile)
        ).then(response => response.data)
    }
}
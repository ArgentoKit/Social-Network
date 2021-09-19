import { instance, ResponseType } from "./api"

type SecurityAPIResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return (
            instance.get<ResponseType<SecurityAPIResponseType>>(`security/get-captcha-url`).then(res => res.data)
        )
    }
}
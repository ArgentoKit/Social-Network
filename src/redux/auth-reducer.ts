import { stopSubmit } from "redux-form"
import { authAPI, securityAPI } from "../api/api"

const SET_USER_DATA = 'SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.data,
            }
        default:
            return state

    }
}


type SetAuthUserDataActionDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    data: SetAuthUserDataActionDataType
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => {
    return {
        type: SET_USER_DATA,
        data: { id, email, login, isAuth }
    }
}


type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    data: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        data: { captchaUrl }
    }
}


export const getAuthUserData = () => {
    return (
        async (dispatch: any) => {
            let data = await authAPI.authData()

            if (data.resultCode === 0) {
                let { id, email, login } = data.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }
    )
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return (
        async (dispatch: any) => {
            let data = await authAPI.login(email, password, rememberMe, captcha)

            if (data.resultCode === 0) {
                dispatch(getAuthUserData())
            } else {
                if (data.resultCode === 10)  {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                dispatch(stopSubmit('login', { _error: message }))
            }

        }
    )
}
export const logout = () => {
    return (
        async (dispatch: any) => {
            let data = await authAPI.logout()

            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }

        }
    )
}
export const getCaptchaUrl = () => {
    return (
        async (dispatch: any) => {
            let response = await securityAPI.getCaptchaUrl()
            const captchaUrl = response.data.url

            dispatch(getCaptchaUrlSuccess(captchaUrl))
        }
    )
}


export default authReducer
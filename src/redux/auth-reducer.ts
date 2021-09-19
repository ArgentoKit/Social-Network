import { Dispatch } from "redux"
import { stopSubmit } from "redux-form"
import { ThunkAction } from "redux-thunk"
import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api"
import { authAPI } from "../api/auth-api"
import { securityAPI } from "../api/security-api"
import { AppStateType } from "./redux-store"

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

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const getAuthUserData = () => {
    return (
        async (dispatch: Dispatch<ActionsType>) => {
            let meData = await authAPI.authData()

            if (meData.resultCode === ResultCodesEnum.Success) {
                let { id, email, login } = meData.data
                dispatch(setAuthUserData(id, email, login, true))
            }
        }
    )
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return (
        async (dispatch) => {
            let data = await authAPI.login(email, password, rememberMe, captcha)

            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthUserData())
            } else {
                if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired)  {
                    dispatch(getCaptchaUrl())
                }
                let message = data.messages.length > 0 ? data.messages[0] : 'Some error'
                // @ts-ignore
                dispatch(stopSubmit('login', { _error: message }))
            }

        }
    )
}
export const logout = (): ThunkType => {
    return (
        async (dispatch) => {
            let data = await authAPI.logout()

            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(setAuthUserData(null, null, null, false))
            }

        }
    )
}
export const getCaptchaUrl = (): ThunkType => {
    return (
        async (dispatch) => {
            let response = await securityAPI.getCaptchaUrl()
            const captchaUrl = response.data.url

            dispatch(getCaptchaUrlSuccess(captchaUrl))
        }
    )
}


export default authReducer
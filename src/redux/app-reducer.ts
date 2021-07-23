import { ThunkAction } from "redux-thunk"
import { getAuthUserData } from "./auth-reducer"
import { AppStateType } from "./redux-store"

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

type InitialStateType = {
    initialized: boolean
}
let initialState: InitialStateType = {
    initialized: false,
}

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state

    }
}

type ActionsType = InitializedSuccessActionType

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = (): InitializedSuccessActionType => {
    return {
        type: INITIALIZED_SUCCESS,
    }
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>
export const initializeApp = (): ThunkType => {
    return (
        async (dispatch) => {
            await dispatch(getAuthUserData())
            dispatch(initializedSuccess())
        }
    )
}

export default appReducer
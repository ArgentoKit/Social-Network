const SEND_MESSAGE = 'SEND-MESSAGE'

type MessagesType = {
    id: number
    message: string
}
type DialogsType = {
    id: number
    name: string
}
let initialState = {
    messagesData: [
        {id: 1, message: 'Hey, how are you?'},
        {id: 2, message: 'Go playing CS'}
    ] as Array<MessagesType>,
    dialogsData: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Kosta'}
    ] as Array<DialogsType>,
}

export type InitialStateType = typeof initialState

const messagesReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SEND_MESSAGE:
            let text = action.newMessageText
            let newMessage = {
                id: 3,
                message: text
            }
            return {
                ...state,
                messagesData: [...state.messagesData, newMessage]
            }
        default:
            return state
    }
}

type SendMessageActionType = {
    type: typeof SEND_MESSAGE,
    newMessageText: string
}
export const sendMessageCreator = (newMessageText: string): SendMessageActionType => ( {type: SEND_MESSAGE, newMessageText} )

export default messagesReducer
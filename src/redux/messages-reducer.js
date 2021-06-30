const SEND_MESSAGE = 'SEND-MESSAGE'

let initialState = {
    messagesData: [
        {id: 1, message: 'Hey, how are you?'},
        {id: 2, message: 'Go playing CS'}
    ],
    dialogsData: [
        {id: 1, name: 'Andrew'},
        {id: 2, name: 'Kosta'}
    ],
}

const messagesReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageText) => ( {type: SEND_MESSAGE, newMessageText} )

export default messagesReducer
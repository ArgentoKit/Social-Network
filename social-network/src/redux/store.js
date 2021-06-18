import messagesReducer from "./messages-reducer"
import profileReducer from "./profile-reducer"

let store = {
    _state: {
        profilePage: {
            postsData: [
                {id: 1, message: 'You are beatiful, you know?'},
                {id: 2, message: 'Nice photo'},
                {id: 3, message: 'How are you?'}
            ],
            newPostText: ''
        },
        messagesPage: {
            messagesData: [
                {id: 1, message: 'Hey, how are you?'},
                {id: 2, message: 'Go playing CS'}
            ],
            dialogsData: [
                {id: 1, name: 'Andrew'},
                {id: 2, name: 'Kosta'}
            ],
            newMessageText: ''
        }
    },
    _callSubscriber () {
        console.log('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        profileReducer(this._state.profilePage, action)
        messagesReducer(this._state.messagesPage, action)
        
        this._callSubscriber(this._state)
    }
}

export default store
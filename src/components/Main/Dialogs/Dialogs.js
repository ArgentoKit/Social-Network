import React from 'react';
import s from './Dialogs.module.scss';
import Dialog from './Dialog/Dialog'
import Message from './Message/Message'
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormControl/FormControl';
import { maxLengthCreator, required } from '../../../utils/validators/validators';

const maxLength100 = maxLengthCreator(100)

const Dialogs = (props) => {

    let messagesPage = props.messagesPage

    let dialogsElements = messagesPage.dialogsData.map(dialog => <Dialog name={dialog.name} id={dialog.id} key={dialog.id} />)
    let messagesElements = messagesPage.messagesData.map(el => <Message message={el.message} key={el.id} />)

    let sendMessage = (values) => {
        props.sendMessage(values.newMessageText)
    }

    return (
        <div className={s.dialogs}>
            <div className={s.list}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageReduxForm onSubmit={sendMessage}/>
            </div>
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form className={s.newMessage} onSubmit={props.handleSubmit}>
            <Field className={s.text} 
                    component={Textarea} 
                    name='newMessageText' 
                    placeholder='Enter your message'
                    validate={[required, maxLength100]}/>
            <button className={s.sendMessage}>Send</button>
        </form>
    )
}

const AddMessageReduxForm = reduxForm({
    form: 'newMessage'
})(AddMessageForm)

export default Dialogs;
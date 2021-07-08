import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../common/FormControl/FormControl'
import { login } from '../../redux/auth-reducer'
import s from './Login.module.scss'
import { Redirect } from 'react-router'

const maxLength30 = maxLengthCreator(30)

const Login = (props) => {
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div className={s.auth}>
            <h2>Login</h2>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className={s.Input} component={Input} name={'email'} placeholder={'Email'} validate={[required, maxLength30]} />
            </div>
            <div>
                <Field className={s.Input} 
                        component={Input} 
                        name={'password'} 
                        placeholder={'Password'} 
                        type={'password'}
                        validate={[required, maxLength30]} />
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'} type='checkbox' /> remember me
            </div>
            { props.captchaUrl && <img src={props.captchaUrl}/> }
            { props.captchaUrl && <Field className={s.Input} component={Input} name={'captcha'} placeholder={'Symbols from image'} validate={[required]} /> }

            { props.error && 
            <div className={s.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

const mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
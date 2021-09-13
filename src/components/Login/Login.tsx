import React, { FC } from 'react'
import { connect } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Input } from '../common/FormControl/FormControl'
import { login } from '../../redux/auth-reducer'
import s from './Login.module.scss'
import { Redirect } from 'react-router'
import { AppStateType } from '../../redux/redux-store'

const maxLength30 = maxLengthCreator(30)

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, captchaUrl, error}) => {
    return (
        <form onSubmit={handleSubmit}>
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
            { captchaUrl && <img src={captchaUrl}/> }
            { captchaUrl && <Field className={s.Input} component={Input} name={'captcha'} placeholder={'Symbols from image'} validate={[required]} /> }

            { error && 
            <div className={s.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValuesType) => {
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

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)
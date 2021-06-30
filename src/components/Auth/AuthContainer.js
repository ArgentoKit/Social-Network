import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../../redux/auth-reducer'
import Auth from './Auth'

class AuthContainer extends React.Component {
    render() {
        return <Auth {...this.props} />
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}

export default connect(mapStateToProps, { logout })(AuthContainer)
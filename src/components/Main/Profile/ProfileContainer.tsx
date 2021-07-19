import React from 'react';
import Profile from './profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile } from '../../../redux/profile-reducer'
import { withRouter } from 'react-router';
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { FormProfileDataType, ProfileType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type ParamsType = {
    userId: number | undefined
}
type MatchType = {
    isExact: Boolean
    params: ParamsType
}
type MapStatePropsType = {
    match: MatchType
    authorizedUserId: number
    profile: ProfileType
    status: string
}
type MapDispatchPropsType = {
    updateStatus: (status: string) => void
    saveAvatar: (file: any) => void
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    saveProfile: (formData: FormProfileDataType) => void
}
type OwnPropsType = {

}
type StateType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authorizedUserId
            if(!userId) {
                // @ts-ignore
                this.props.history.push('/login')
            }
        }
        this.props.getUserProfile(userId)
        this.props.getStatus(userId)
    }
    componentDidMount() {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile    isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus}
                        saveAvatar={this.props.saveAvatar}
                        saveProfile={this.props.saveProfile}/>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)

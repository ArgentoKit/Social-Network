import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, 
        setTotalUsersCount, 
        requestUsers, 
        follow, 
        unfollow } from '../../../redux/users-reducer';
import Users from './Users';
import Preloader from '../../common/Preloader/Preloader'
import { compose } from 'redux';
import { getCurrentPage, getFollowingProgress, getPageSize, getTotalUsersCount, getUsers, getIsFetching } from '../../../redux/users-selectors';
import { UserType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingProgress: Array<number>
}
type MapDispatchPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}
type OwnPropsType = {

}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(pageNumber, this.props.pageSize)
    }
    
    render () {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users  onPageChanged={this.onPageChanged}
                    totalUsersCount={this.props.totalUsersCount} 
                    pageSize={this.props.pageSize} 
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    followingProgress={this.props.followingProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}/></>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingProgress: getFollowingProgress(state)
    }
}

export default compose(
    // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
        setCurrentPage,
        setTotalUsersCount,
        requestUsers,
        follow,
        unfollow
    }),
)(UsersContainer)


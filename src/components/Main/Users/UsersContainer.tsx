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

type PropsType = {
    currentPage: number
    pageSize: number
}

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
                    followSuccess={this.props.followSuccess}
                    unfollowSuccess={this.props.unfollowSuccess}
                    totalUsersCount={this.props.totalUsersCount} 
                    pageSize={this.props.pageSize} 
                    currentPage={this.props.currentPage}
                    users={this.props.users}
                    followingProgress={this.props.followingProgress}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}/></>
    }
}

let mapStateToProps = (state) => {
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
    connect(mapStateToProps, {
        setCurrentPage,
        setTotalUsersCount,
        requestUsers,
        follow,
        unfollow
    }),
)(UsersContainer)


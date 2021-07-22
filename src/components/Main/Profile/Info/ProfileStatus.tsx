import React, { ChangeEvent } from 'react';
import s from './info.module.scss';

type PropsType = {
    status: string
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }
    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.target.value
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={s.status}>
                {!this.state.editMode && <span onDoubleClick={this.activateEditMode}>{this.props.status || '-__-'}</span>}
                {this.state.editMode && <input  autoFocus={true} 
                                                onBlur={this.deactivateEditMode} 
                                                onChange={this.onStatusChange}
                                                value={this.state.status} />}
            </div>
        );
    }
}

export default ProfileStatus
import React, { useEffect, useState } from 'react';
import s from './info.module.scss';

const ProfileStatusWithHooks = (props) => {
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) => {
        setStatus(e.target.value)
    }

    return (
        <div className={s.status}>
            {!editMode && <span onDoubleClick={activateEditMode}>{props.status || '-__-'}</span>}
            {editMode && <input autoFocus={true}
                onBlur={deactivateEditMode}
                onChange={onStatusChange}
                value={status} />}
        </div>
    );
}

export default ProfileStatusWithHooks
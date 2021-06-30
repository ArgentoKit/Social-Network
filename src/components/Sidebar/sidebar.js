import React from 'react';
import style from './sidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faComment, faNewspaper, faMusic, faCog, faUsers } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

const profile = <FontAwesomeIcon icon={faUser} />
const messages = <FontAwesomeIcon icon={faComment} />
const users = <FontAwesomeIcon icon={faUsers} />
const news = <FontAwesomeIcon icon={faNewspaper} />
const music = <FontAwesomeIcon icon={faMusic} />
const settings = <FontAwesomeIcon icon={faCog} />

const Sidebar = () => {
    return (
        <aside className={style.sidebar}>
            <div className={style.menu}>
                <ul className={style.list}>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/profile"><span className={style.icon}>{profile}</span>Profile</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/dialogs"><span className={style.icon}>{messages}</span>Messages</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/users"><span className={style.icon}>{users}</span>Users</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/news"><span className={style.icon}>{news}</span>News</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/music"><span className={style.icon}>{music}</span>Music</NavLink>
                    </li>
                    <li className={style.item}>
                        <NavLink className={style.link} to="/settings"><span className={style.icon}>{settings}</span>Settings</NavLink>
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar;
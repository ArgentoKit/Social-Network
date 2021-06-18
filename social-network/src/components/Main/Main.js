import React from 'react';
import { Route } from 'react-router-dom';
import style from './Main.module.scss';
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import DialogsContainer from './Dialogs/DialogsContainer';
import UsersContainer from './Users/UsersContainer';
import ProfileContainer from './Profile/ProfileContainer';

const Main = () => {
    return (
        <main className={style.main}>
            <Route path='/profile/:userId?' render={ () => <ProfileContainer />} />
            <Route path='/dialogs' render={ () => <DialogsContainer />}/>
            <Route path='/news' render={ () => <News /> } />
            <Route path='/music' render={ () => <Music /> } />
            <Route path='/users' render={ () => <UsersContainer /> } />
            <Route path='/settings' render={ () => <Settings /> } />
        </main>
    );
}

export default Main;
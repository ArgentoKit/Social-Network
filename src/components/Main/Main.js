import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import style from './Main.module.scss';
import News from './News/News';
import Music from './Music/Music';
import Settings from './Settings/Settings';
import UsersContainer from './Users/UsersContainer';
import Preloader from '../common/Preloader/Preloader';
const DialogsContainer = React.lazy(() => import('./Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Profile/ProfileContainer'));

const Main = () => {
    return (
        <main className={style.main}>
            <Switch>
                <Route exact path='/'>
                    <Redirect to='/profile' />
                </Route>
                <Route path='/profile/:userId?' render={() => {
                    return (
                        <Suspense fallback={<Preloader />}>
                            <ProfileContainer />
                        </Suspense>
                    )
                }} />
                <Route path='/dialogs' render={() => {
                    return (
                        <Suspense fallback={<Preloader />}>
                            <DialogsContainer />
                        </Suspense>
                    )
                }} />
                <Route path='/news' render={() => <News />} />
                <Route path='/music' render={() => <Music />} />
                <Route path='/users' render={() => <UsersContainer />} />
                <Route path='/settings' render={() => <Settings />} />
            </Switch>
        </main>
    );
}

export default Main;
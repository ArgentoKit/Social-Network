import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthContainer from './components/Auth/AuthContainer.js';
import Main from './components/Main/Main.js';
import Sidebar from './components/Sidebar/sidebar.js'
import LoginPage from './components/Login/Login'
import style from './scss/app.module.scss';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader.js';
import { compose } from 'redux';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp()
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }
    return (
      <BrowserRouter>
        <div className={style.wrapper}>
          <div className={style.container}>
            <Sidebar />
            <Main />
            <Route path='/login' render={() => <LoginPage />} />
            <AuthContainer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  connect(mapStateToProps, { initializeApp })
)(App)

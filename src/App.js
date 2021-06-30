import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
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
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <Sidebar />
          <Main />
          <Route path='/login' render={() => <LoginPage />} />
          <AuthContainer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  connect(mapStateToProps, { initializeApp })
)(App)

const SamuraiJsApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>,
    </BrowserRouter>
  )
}

export default SamuraiJsApp
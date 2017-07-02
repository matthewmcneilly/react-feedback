import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './components/Routes';
import { loginUserSuccess } from './actions';
import { getActiveUser, setActiveUserId } from './actions/entities';
import logger from 'redux-logger';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

// called before render method
class App extends Component {
  componentWillMount() {
    // configuration settings for firebase
    const config = {
      apiKey: "AIzaSyDjJZlViFlBll3sJn3FJyLtuEO7CJeukPQ",
      authDomain: "feedback-b728b.firebaseapp.com",
      databaseURL: "https://feedback-b728b.firebaseio.com",
      storageBucket: "feedback-b728b.appspot.com",
      messagingSenderId: "379320058706"
    };

    // Initalize Firebase connection and get current user
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // Dispatch Redux actions
        store.dispatch(setActiveUserId({uid: user.uid}));
        store.dispatch(loginUserSuccess(user));
        store.dispatch(getActiveUser(user.uid));
      }
    });
  }

  render() {

    return (
      <Provider store={store}>
        <div className="App">
          <Routes />
        </div>
      </Provider>
    );
  }
}

export default App;

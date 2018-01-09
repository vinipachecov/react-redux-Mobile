import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';   
import firebase from 'firebase';

// Redux thunk works like a middleware, and as you might guess it is why 
// we import applyMiddleware from redux.
//  In this case we use for handling asynchronous code requests.

import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import configuration from '../config/configuration';
import LoginForm from './components/LoginForm';

class App extends Component {

    //basic firebase code setup

    componentWillMount() {
        const config = {
            apiKey: configuration.apiKey,
            authDomain: configuration.authDomain,
            databaseURL: configuration.databaseURL,
            projectId: configuration.projectId,
            storageBucket: configuration.storageBucket,
            messagingSenderId: configuration.messagingSenderId
          };
          
          firebase.initializeApp(config);
    }
    
    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>          
        );
    }
}
export default App;

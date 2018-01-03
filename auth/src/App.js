import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCPA96SjhPhcONpu27KkwEmgJzpo_ju-Is',
            authDomain: 'authentication-ccab2.firebaseapp.com',
            databaseURL: 'https://authentication-ccab2.firebaseio.com',
            projectId: 'authentication-ccab2',
            storageBucket: 'authentication-ccab2.appspot.com',
            messagingSenderId: '425712239684'
          });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                 <LoginForm />  
            </View>
        );
    }
}

export default App;

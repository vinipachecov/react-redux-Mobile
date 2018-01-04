import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {    
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCPA96SjhPhcONpu27KkwEmgJzpo_ju-Is',
            authDomain: 'authentication-ccab2.firebaseapp.com',
            databaseURL: 'https://authentication-ccab2.firebaseio.com',
            projectId: 'authentication-ccab2',
            storageBucket: 'authentication-ccab2.appspot.com',
            messagingSenderId: '425712239684'
          });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }            
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
            return (
                <CardSection>
                    <Button                    
                    onPress={() => firebase.auth().signOut()}
                    >
                    Log out
                    </Button>
                </CardSection>
            );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                 {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    ButtonStyle: {
        marginTop: 5,
    }
};

export default App;

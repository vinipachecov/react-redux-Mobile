import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {    
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            // put our Firebase code here...
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

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

// everything to handle the login action

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    //binded function
    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                            this.setState({ error: 'Authentication Failed.' });                
                    });              
            });        
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Button
            onPress={this.onButtonPress.bind(this)}
            > 
                Log in
            </ Button>
        );
    }


    render() {
        return (
            // <Card>

            //     <Text>
            //         Ola
            //         </Text>

                
             <Card>

                 <CardSection>
                    <Input                         
                        placeholder="user@email.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}                        
                    />
                </CardSection>     

                <CardSection>
                    <Input 
                            secureTextEntry
                            placeholder="******"                        
                            label="Password"
                            value={this.state.password}
                            onChangeText={password => this.setState({ password })}                        
                    />
                </CardSection>              
                
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}                
                </CardSection>  
            </Card>
           
        );
    }    
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};

export default LoginForm;
 
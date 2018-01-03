import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

// everything to handle the login action

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false, welcomeText: '' };

    //binded function
    onButtonPress() {        
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });        
        
        //        bindingn the function to the current context
        //        same to other calls        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.onLoginSuccess();
            })                   
            .catch((err) => {                   
                switch (err.code) {
                    case 'auth/wrong-password': 
                        this.onLoginFail(err.message);
                        break;                        
                    case 'auth/user-not-found':
                        firebase.auth().createUserWithEmailAndPassword(email, password)                                      
                        .catch(this.onLoginFail(err.message))
                        .then(this.onLoginSuccess());
                        break;
                    default:     
                        this.onLoginFail.bind(this, err.message);
                        break;
                }                                       
            });
                // .then((sucess) => {
                //     this.onLoginSuccess.bind(this)}
                // );                      
    }

    onLoginFail(message) {
        this.setState({ error: message, loading: false, password: '', welcomeText: '' });
    }
    
    onLoginSuccess() {        
        this.setState({ 
            email: '',
            password: '',
            loading: false,
            error: '',
            welcomeText: 'Welcome back!'
        });        
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>          
        );
    }


    render() {
        return (
                           
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

                <Text style={styles.confirmLoginTextStyle}>
                    {this.state.welcomeText}
                </Text>                
                
            </Card>
           
        );
    }    
}

const styles = {
    confirmLoginTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: '#008080'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red',
    }
};

export default LoginForm;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Keyboard } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChange, loginUser } from '../actions';


class LoginForm extends Component {
    
    //helper functions for redux which calls a respective action creator
    onEmailChange(text) {        
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {        
        this.props.passwordChange(text);
    }

    onButtonPress() {
        Keyboard.dismiss();
        const { email, password } = this.props;        

        this.props.loginUser({ email, password });
    }

    renderError() {
        if (this.props.error) {
            return (
                <View style={{ backgroundColor: 'white' }}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}      
                    </Text>
                </View>
            );
        }
    }

    renderButtonOrSpinner() {
        if (this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                        Login
                    </ Button>
        );
    }

    render() {
        return (
            <Card>               
                <CardSection>
                    <Input
                        label='Email'
                        placeholder='email@gmail.com'
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        secureTextEntry
                        label="Password"
                        placeholder="password"
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.value}
                    />
                </CardSection>

                {this.renderError()}

                <CardSection>
                    {this.renderButtonOrSpinner()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = state => {
    const { email, password, error, loading } = state.auth;
    return {
        email,
        password,
        error,
        loading
    };
};

export default connect(mapStateToProps, { 
    emailChanged, passwordChange, loginUser })(LoginForm);

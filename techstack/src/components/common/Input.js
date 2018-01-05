import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
const { inputStyle, labelStyle, containerStyle } = styles;

    return (
        <View style={containerStyle}>     
            <Text
            style={labelStyle}               
            >{label}</Text>        
            <TextInput     
                secureTextEntry={secureTextEntry}
                underlineColorAndroid='transparent'
                autoCorrect={false}           
                placeholder={placeholder}
                style={inputStyle}
                value={value}
                onChangeText={onChangeText}                
            />
        </View>
    );
};

const styles = {
    inputStyle: {       
        marginTop: 5,                       
        paddingLeft: 10,
        paddingRight: 5,
        height: 40,
        width: 400,
        color: '#000',                 
        fontSize: 18,
        lineHeight: 10,
        flex: 2                            
    },
    labelStyle: {        
        color: '#000',
        fontSize: 18,
        paddingLeft: 20, 
        flex: 1,               
    },
    containerStyle: {
        backgroundColor: '#FFF',
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
    }
};

export { Input };

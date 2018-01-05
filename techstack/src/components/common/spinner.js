import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
const { spinnerStyle } = styles;

    return (
        
            <ActivityIndicator 
            style={spinnerStyle}
            size={size || "large"}
            animating            
            color="#0000ff"
            />
        
    );
};

const styles = {
    spinnerStyle: {        
        alignSelf: 'center',        
    }    
};

export { Spinner };

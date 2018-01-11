// file for handling our Form to create an employee

import React, { Component } from 'react';
import { Keyboard, Picker, Text } from 'react-native';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {

    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.employeeCreate({ name, phone, 'shift': shift || 'Monday'});

        Keyboard.dismiss();
    };

    //IMPORTANT
    // Each onChangeText of the inputs has a function with a prop name, which will be used
    // inside the employeeAction creator to understand which property needs to be updated

    render() {
        console.log(this.props.employee);
        return (
            <Card> 

                <EmployeeForm {...this.props} />

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Create
                    </Button>
                </CardSection>           

            </Card>
        );
    }
}
const styles = {
    pickerTextStyle: {
        fontSize: 18,
        paddingLeft: 20,     
        color: '#000'                    
    },
    pickerStyle: {        
        flex: 1        
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};

export default connect(mapStateToProps, { 
    employeeUpdate, employeeCreate })(EmployeeCreate);


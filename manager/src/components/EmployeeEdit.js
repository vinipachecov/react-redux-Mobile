import React, { Component } from 'react';
import { Card, CarSection, Button, CardSection, Confirm } from './common';
import _ from 'lodash';
import { connect } from 'react-redux';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions/index';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';


export class EmployeeEdit extends Component {
    state = { showModal: false };
    componentWillMount() {        
        //iterate on every object and update our props
        //with the employee values as pre-filled values in our form
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }  

    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });        
    }

    onTextPress() {
        const { name, phone, shift } = this.props;
        
        Communications.text(phone, `Your upcoming shift is on ${shift}`);
    }

    onAccept() {
        const { uid } = this.props.employee;

        this.props.employeeDelete({ uid });
    }

    onDecline() {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Save Changes
                    </Button>
                </CardSection>          

                <CardSection>
                    <Button onPress={this.onTextPress.bind(this)}>
                        Text Schedule
                    </Button>
                </CardSection>      

                <CardSection>
                    <Button onPress={() => this.setState({ showModal: !this.state.showModal})}>
                        FIre Employee
                    </Button>
                </CardSection>      

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are you sure you want to delete this?
                </Confirm>
                  
            </Card>
        )
    };
};

const mapStateToProps = (state) => {  
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit)

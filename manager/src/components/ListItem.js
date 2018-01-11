import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';
import { Actions } from 'react-native-router-flux';


export default class ListItem extends Component {

  onRowPress() {
    Actions.employeeEdit({ employee : this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection style={{ justifyContent: 'flex-start',}}>
            <Text style={styles.titleStyle}>
                {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    )
  }
};

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15,
    }
};

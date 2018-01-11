import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeeFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount() {
        this.props.employeeFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        //next set of props that this component
        // will be rendered with
        // this.props is still the old set of props
        this.createDataSource(nextProps);
    }

    createDataSource( {employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.DataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee) {
        return <ListItem employee={employee} />;
    }

    render() {
        console.log(this.props);
        return (
            <ListView
                enableEmptySections
                dataSource={this.DataSource}
                renderRow={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val,uid) => {
        return { ...val, uid };
    });
    return { employees };
};


export default connect(mapStateToProps, { employeeFetch })(EmployeeList);

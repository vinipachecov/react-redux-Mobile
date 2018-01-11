// This file has our Router tag configuration

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

export const RouterComponent = () => {
    return (
        <Router sceneStyle={{ backgroundColor: '#FFF' }}>

        <Scene key="root" hideNavBar>

            <Scene key="auth" >
                <Scene                
                key="login"
                component={LoginForm}
                title="Please Login"                
                />        
            </Scene>

            <Scene key="main" >  
                <Scene
                //  Always remember that Actions. calls the KEY of a specific scene.
                    onRight={() => Actions.employeeCreate()}
                    rightTitle=" Add" 
                    key='employeeList'
                    component={EmployeeList}
                    title="Employees"          
                    back={false}                                           
                />                      
                <Scene
                    key="employeeCreate"
                    title="Create Employee"
                    component={EmployeeCreate}                    
                />                                 
                <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />                
            </Scene >

        </Scene>          

        </Router>
      );
};


export default RouterComponent;

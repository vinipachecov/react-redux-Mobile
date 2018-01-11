// This file is for our action creators

// * action creators are functions
// * they must return an action
// * an action is an object with a 'type' property

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

// Our list of Action Creators

// Login form input action creators

export const emailChanged = (text) => {
    return {    
        //returns a plain js object
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChange = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

// loginUser is an asynchonous code so we need to use redux-thunk
// this changes a little bit because in redux-thunk action creators behave like:
// * action creators are functions
// * they must return a function instead of an action
// * this function returned will be called with dispatch

export const loginUser = ({ email, password }) => {
    // we return a function instead of an object    
    
    return (dispatch) => {      
        dispatch({ type: LOGIN_USER }); 
        // with this redux thunk knows it is an asynchronous block
        firebase.auth().signInWithEmailAndPassword(email, password)     
        .then((user) => {
            loginUserSucess(dispatch, user);            
        })
        .catch((error) => {                                            
            switch (error.code) {
                case 'auth/wrong-password': 
                    loginUserFail(dispatch);
                    break;                        
                case 'auth/user-not-found':
                    firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSucess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
                    break;
                case 'auth/invalid-email':
                    loginUserFail(dispatch);
                    break;
                default:     
                    console.log(`Critical error ${error}`);                    
                    break;                
            }
        });
    };    
};


const loginUserFail = (dispatch) => {
    console.log('failed');
    dispatch({ type: LOGIN_USER_FAIL });
};

//helper method for loginUser
const loginUserSucess = (dispatch, user) => {
    dispatch({
         type: LOGIN_USER_SUCCESS, payload: user 
        });

        //CHange our scene to EmployeeList calling our key from router as a function
    Actions.main();
};


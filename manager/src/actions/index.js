// This file is for our action creators

// * action creators are functions
// * they must return an action
// * an action is an object with a 'type' property

import firebase from 'firebase';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL
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
    firebase.auth().signInWithEmailAndPassword(email, password)
    // with this redux thunk knows it is an asynchronous block
        .then(user => loginUserSucess(dispatch, user))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(user => loginUserSucess(dispatch, user))
                .catch(() => loginUserFail(dispatch));
        });
    };
};


const loginUserFail = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAIL
       });
};

//helper method for loginUser
const loginUserSucess = (dispatch, user) => {
    dispatch({
         type: LOGIN_USER_SUCCESS, payload: user 
        });
};


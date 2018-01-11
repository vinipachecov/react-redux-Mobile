// create a function that has 2 args and export it by default


import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL, 
    LOGIN_USER
} from '../actions/types';

// Our initial property states
const INITIAL_STATE = {
    email: '', 
    password: '',
    user: null,
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    // here  we will catch an action type
    // and we will update a specific prop    
    switch (action.type) {
        case EMAIL_CHANGED:   
        //update our state object and return it updated here  
        // return a new object
            return { ...state, email: action.payload };       
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            console.log('login failed');
            return { ...state, error: 'Authentication Failed.', password: '', loading: false };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        default:
            return state;
    }
};

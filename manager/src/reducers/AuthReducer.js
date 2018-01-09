// create a function that has 2 args and export it by default


import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS } from '../actions/types';

// Our initial property states
const INITIAL_STATE = {
    email: '', 
    password: '',
    user: ''
};

export default (state = INITIAL_STATE, action) => {
    // here  we will catch an action type
    // and we will update a specific prop
    console.log(action);
    switch (action.type) {
        case EMAIL_CHANGED:   
        //update our state object and return it updated here  
        // return a new object
            return { ...state, email: action.payload };       
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

// Import the action type so we can set it as the case
import UserActionTypes from './user.types';

// We want to set our default state here, which
// will be passed into the reducer as the default
// This was what we initially set in the App.js
// file, but we're just moving it into here instead
const INITIAL_STATE = {
    currentUser: null,
    // Added when we are creating our sagas
    error: null
}

// We set INITIAL_STATE as the default value of state
const userReducer = (state = INITIAL_STATE, action) => {
    // Use a switch statement to check the action.type
    switch(action.type) {
        // If the type is SIGN_IN_SUCCESS
        case UserActionTypes.SIGN_IN_SUCCESS:
            // We return a new object where we spread in
            // the state, and we update the
            // currentUser property valie to the payload
            // React components ONLY re-render IF the props
            // are different, so we need to use an object to
            // update the props, so the object it has is new
            // We also want to set the error value back to null,
            // to clear any previous errors if there was a
            // failed sign-in attempt
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        // If the type is SIGN_OUT_SUCCESS, we return a new
        // object where we spread in the state, and we update
        // the currentUser and error values to null
        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        // If there is sign in/out a failure, we will show
        // our error
        // We can stack these on top of eachother, as
        // the return statement is the same
        case UserActionTypes.SIGN_IN_FAILURE:
        case UserActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        // The default value will be our previous state
        // if the type doesn't match the reducer's congfig
        default:
            return state;
    }
};

export default userReducer;
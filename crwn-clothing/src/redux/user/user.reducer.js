// We want to set our default state here, which
// will be passed into the reducer as the default
// This was what we initially set in the App.js
// file, but we're just moving it into here instead
const INITIAL_STATE = {
    currentUser: null
}

// We set INITIAL_STATE as the default value of state
const userReducer = (state = INITIAL_STATE, action) => {
    // Use a switch statement to check the action.type
    switch(action.type) {
        // If the type is SET_CURRENT_USER
        case 'SET_CURRENT_USER':
            // We return a new object where we spread in
            // the state, and we update the
            // currentUser property valie to the payload
            // React components ONLY re-render IF the props
            // are different, so we need to use an object to
            // update the props, so the object it has is new
            return {
                ...state,
                currentUser: action.payload
            }

        // The default value will be our previous state
        // if the type doesn't match the reducer's congfig
        default:
            return state;
    }
};

export default userReducer;
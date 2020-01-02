// Import the action type so we can set it as the case
import { UserActionTypes } from './user.types';

// setCurrentUser is our action which takes a user
// parameter and is passed in to the reducer. The
// user parameter is the value that we set our
// currentUser to, which will be passed into the
// payload property of the action.
// This is used instead of saying setState()
export const setCurrentUser = user => ({
    // The type needs to be the same string that the
    // reducer's switch statement is expecting
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});
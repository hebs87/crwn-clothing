// Import the action type so we can set it as the case
import UserActionTypes from './user.types';

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

// -----------Google Sign In Actions-----------
// This action is a function that just triggers
// the actual sign in. It doesn't need a payload,
// as we are only telling the saga that we need
// to trigger our sign-in
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

// This call will get the actual current user
// at the end of it, which will be our payload value
export const googleSignInSuccess = user => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

// This call will get the error at the end of it,
// which will be our payload value
export const googleSignInFailure = error => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

// ------------Email Sign In Actions------------
// This action is a function that just triggers
// the actual sign in. However, the difference
// between this and the Google one is that we
// need to get the email and password so that
// we can verify or add it to the database. To
// do this, we get the emailAndPassword and set
// it as the payload
export const emailSignInStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

// This call will get the actual current user
// at the end of it, which will be our payload value
export const emailSignInSuccess = user => ({
    type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

// This call will get the error at the end of it,
// which will be our payload value
export const emailSignInFailure = error => ({
    type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
});

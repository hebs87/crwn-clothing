// Import the action type so we can set it as the case
import UserActionTypes from './user.types';

// ------------Universal Actions------------
// This call will get the actual current user
// at the end of it, which will be our payload value
export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

// This call will get the error at the end of it,
// which will be our payload value
export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

// -----------Google Sign In Actions-----------
// This action is a function that just triggers
// the actual sign in. It doesn't need a payload,
// as we are only telling the saga that we need
// to trigger our sign-in
export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
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

// ------------User Persistence Action------------
export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

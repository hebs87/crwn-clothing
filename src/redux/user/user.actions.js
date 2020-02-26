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
// we can verify them in the database. To
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

// ------------Sign Out Actions------------
// This action only issues the sign out start action,
// so there is no payload
export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

// This action only issues the sign out success action,
// so there is no payload
export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

// This action issues the sign out failure action, but
// we need to catch the error and set it to the payload
export const signOutFailure = error => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

// ------------Sign Up Actions------------
// This action is a function that just triggers
// the actual sign in. However, we need to get the
// email, password and displayName, which we will
// pass all three in as a userCredentials object.
// We can then add them to the database. To do this, we
// get the userCredentials and set them as the payload
export const signUpStart = userCredentials => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
});

// Once we get our SIGN_UP_SUCCESS call, we want to
// succeed with the user object created from the
// createUserWithEmailAndPassword method from our
// firebase utils. To create it in our backend, we
// also need to run our createUserProfileDocument
// firebase util, into which we will pass the user
// details (email and password) and also our displayName
// Due to this, we will need to get both the user
// and additionalData (displayName) and set them as
// a payload object
export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
});

// This action issues the sign up failure action, but
// we need to catch the error and set it to the payload
export const signUpFailure = error => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: error
});

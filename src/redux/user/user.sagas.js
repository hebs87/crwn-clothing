import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    // getCurrentUser is for user persistence
    getCurrentUser
} from '../../firebase/firebase.utils';

import {
    signInSuccess,
    signInFailure
} from './user.actions';

// This function gets the snapshot from the user auth object
// and it will be passed into our signInWithGoogle and
// signInWithEmail generator functions
export function* getSnapshotFromUserAuth(userAuth) {
    try {
        // The userRef is what we will get back when we call our
        // createUserProfileDocument and our user. This is the same as
        // const userRef = await createUserProfileDocument(userAuth);
        // that was initially in the App.js file, only it is in the
        // form of a yield, rather than an async await
        const userRef = yield call(createUserProfileDocument, userAuth);
        // We get our snapshop by calling .get() on the userRef
        const userSnapshot = yield userRef.get();
        // We now want to issue out our success action and pass in
        // the snapshot id and spread in the rest of the data
        yield put(
            signInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    } catch (error) {
        // If we get an error, we want to yield the put of that
        // into our failure action and pass in the error message
        yield put(signInFailure(error.message));
    }
}

// Although we will be calling our getSnapshotFromUserAuth
// generator function that has its own try catch block, which
// is a repitition of the one in this function, the error
// that will be displayed here is if there is one with the
// signInWithPopUp function instead - we want to have a try
// catch block for any API requests
export function* signInWithGoogle() {
    try {
        // When we sign in, we get our userRef, but we only want the
        // user object from it, so we destructure that first
        // We don't use the auth.signInWithPopup(googleProvider)
        // function directly from the firebase utils, because we want
        // to access the object that gets returned from the success
        // of our signInWithPopup
        const { user } = yield auth.signInWithPopup(googleProvider);
        // We yield our getSnapshotFromUserAuth generator function
        // and pass in the user object
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        // If we get an error, we want to yield the put of that
        // into our failure action and pass in the error message
        yield put(signInFailure(error.message));
    }
};

// For signing in with email, we only want our email and password
// from our payload, so we need to destructure that in our params
// Although we will be calling our getSnapshotFromUserAuth
// generator function that has its own try catch block, which
// is a repitition of the one in this function, the error
// that will be displayed here is if there is one with the
// signInWithEmailAndPassword function instead - we want to have
// a try catch block for any API requests
export function* signInWithEmail({payload: { email, password }}) {
    try {
        // Again, as with the above generator function, we want our user
        // from the userRef object, but this time, we need to us the
        // signInWithEmailAndPassword method instead and pass in the
        // email and password that we've plucked from the payload
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        // We yield our getSnapshotFromUserAuth generator function
        // and pass in the user object
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        // If we get an error, we want to yield the put of that
        // into our failure action and pass in the error message
        yield put(signInFailure(error.message));
    }
};

// This performs an API call to check whether the user is signed in
// It uses the Promise that we created in our firebase utils
export function* isUserAuthenticated() {
    try {
        // We get back the userAuth object when we call
        // our firebase util method - it works in a similar
        // way to the signIn methods, but instead of using
        // the popup or email methods, it gets the userAuth
        const userAuth = yield getCurrentUser();
        // If the userAuth is null, we want to return out of
        // the function
        if (!userAuth) return;
        // If there is a userAuth, then we want to call our
        // getSnapshotFromUserAuth and pass in the userAuth
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error.message))
    }
};

// We build our onGoogleSignInStart generator function
// which is declared using the function* syntax
// The generator function uses the takeLatest method which
// listens to every action of a specific type (first argument),
// and also a second generator function (second argument) - this
// is how we step through the yield code. It only invokes the
// latest action, so if the signInWithGoogle Saga is run
// multiple times, it will cancel all other previous ones
export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
};

// This will be our saga for the onEmailSignInStart, which will
// be similar to the onGoogleSignInStart saga, except it will
// be listening for the EMAIL_SIGN_IN_START action type and
// it will trigger the signInWithEmail generator function instead
export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    );
};

// This will be our saga that checks for the user auth
export function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        isUserAuthenticated
    )
};

// We create a userSagas that calls all of our sagas,
// so that they can be passed into the root saga
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated)
    ]);
};

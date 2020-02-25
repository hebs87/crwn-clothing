import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
    auth,
    googleProvider,
    createUserProfileDocument
} from '../../firebase/firebase.utils';

import {
    googleSignInSuccess,
    googleSignInFailure,
} from './user.actions';

export function* signInWithGoogle() {
    try {
        // When we sign in, we get our userRef, but we only want the
        // user object from it, so we destructure that first
        // We don't use the auth.signInWithPopup(googleProvider)
        // function directly from the firebase utils, because we want
        // to access the object that gets returned from the success
        // of our signInWithPopup
        const { user } = yield auth.signInWithPopup(googleProvider);
        // The userRef is now what we will get back when we call our
        // createUserProfileDocument and our user. This is the same as
        // const userRef = await createUserProfileDocument(userAuth);
        // that was initially in the App.js file, only it is in the
        // form of a yield, rather than an async await
        const userRef = yield call(createUserProfileDocument, user);
        // We get our snapshop by calling .get() on the userRef
        const userSnapshot = yield userRef.get();
        // We now want to issue out our success action and pass in
        // the snapshot id and spread in the rest of the data
        yield put(
            googleSignInSuccess({
                id: userSnapshot.id,
                ...userSnapshot.data()
            })
        );
    } catch (error) {
        // If we get an error, we want to yield the put of that
        // into our failure action and pass in the error message
        yield put(googleSignInFailure(error.message));
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

// We create a userSagas that calls our onGoogleSignInStart
// saga, so that this can be passed in to the root saga
export function* userSagas() {
    yield all([call(onGoogleSignInStart)]);
};

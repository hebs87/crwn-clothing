import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';

import { clearCart } from './cart.actions';

// This saga just yields us putting out our
// clearCart method
export function* clearCartOnSignOut() {
    yield put(clearCart());
}

// This saga takes the SIGN_OUT_SUCCESS action and
// dispatches the clearCartOnSignOut saga
export function* onSignOutSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_SUCCESS,
        clearCartOnSignOut
    )
};

// This is out root saga that all other sagas
// are passed into
export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ]);
};

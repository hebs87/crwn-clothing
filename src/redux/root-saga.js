import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';

import { userSagas } from './user/user.sagas';

import { cartSagas } from './cart/cart.sagas';

// This root saga yields to the all() call, that
// gets an array of all generators/sagas that we
// invoks
export default function* rootSaga() {
    yield all([
        call(shopSagas),
        call(userSagas),
        call(cartSagas)
    ]);
};

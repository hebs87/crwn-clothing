import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

// This root saga yields to the all() call, that
// gets an array of all generators/sagas that we
// invoks
export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart)
    ]);
};

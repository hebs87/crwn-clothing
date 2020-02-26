// Import takeLatest to listen to every action of specific type
// Import call to enable creating the collectionsMap
// Import put to enable us to dispatch any actions
import { takeLatest, call, put, all } from 'redux-saga/effects';

// Import relevant utilities from firebase utils
import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

// Import action creators from shop actions
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';

// This generator function will be passed into the
// fetchCollectionsStart generator function
// This handled our code for the async request to
// fetch the shop data
export function* fetchCollectionsAsync() {
    try {
        // We want to call the firestore.collection and pass
        // in the name of our collection. This gets the
        // 'collections' collection from firebase and stores
        // it in the collectionRef const
        const collectionRef = firestore.collection('collections');
        // Instead of using the promise get().then() method that
        // we used in our thunk code, we instead create a snapshot
        // const that will be equal to the yielded value of running
        // collectionReg.get(). When this value comes back, it does
        // so in a promise form that gets resolved with the value
        // of our collection reference, and stores it in our snapshot
        const snapshot = yield collectionRef.get();
        // call is the effect inside the generator function that invokes
        // the method. It takes a function or method as its first argument
        // and the parameters as the remaining arguments
        // In this instance it takes the convertCollectionsSnapshotToMap
        // function and passes in the snapshot parameter to create a
        // collectionsMap
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        // put is the saga effect for dispatching actions
        // The only difference to dispatch() is that we have to
        // yield it. So we need to pass in our fetchCollectionsSuccess
        // action and pass in the collectionsMap, which gets dispatched
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        // If there is an error, we use put to dispatch our
        // fetchCollectionsFailure action with the error message
        yield put(fetchCollectionsFailure(error.message));
    }
};

// We build our fetchCollectionsStart generator function
// which is declared using the function* syntax
// The generator function uses the takeLatest method which
// listens to every action of a specific type (first argument),
// and also a second generator function (second argument) - this
// is how we step through the yield code. It only invokes the
// latest action, so if the fetchCollectionsAsync Saga is run
// multiple times, it will cancel all other previous ones
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    );
};

// This is out root saga that all other sagas
// are passed into
export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
};

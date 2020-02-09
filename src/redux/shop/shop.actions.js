import ShopActionTypes from './shop.types';
// Import convertCollectionSnapshotToMap and firestore to enable
// pulling data from the firestore database
import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';

// This is our fetchCollectionsStart action,
// which just returns our type, but no payload,
// because all it does is switch our reducer's
// isFetching state to true
export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

// This is our success call, which fires once we
// have successfully got the data from our firestore
// This is where we get our collectionsMap and set
// it as our payload
export const fetchCollectionsSuccess = collectionsMap ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

// Instead of writing a function that returns an
// action, we are now writing a function that returns
// a function that gets dispatch in it, so that
// whenever dispatch is called, it will fire multiple
// actions
// This is going to be the actual function that we
// pass into our components to begin the fetching
// process.
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // We want to call the firestore.collection and pass
        // in the name of our collection. This gets the
        // 'collections' collection from firebase and stores
        // it in the collectionRef const
        const collectionRef = firestore.collection('collections');
        // We also want to dispatch our fetchCollectionsStart
        // function as soon as this function gets called - this
        // switched our reducer's isFetching state to true
        dispatch(fetchCollectionsStart());
        // Now we want to get the data from it, so we need to
        // use the get() method. This ensures that when
        // the component runs for the first time or re-renders,
        // we get the data that is running. We then use the then()
        // method, which asynchronously gets the snapshot as the
        // prop and then pass it into the
        // convertCollectionSnapshotToMap function and store
        // in a collectionsMap const.
        // We then want to call our updateCollections action
        // and pass the collectionsMap into it
        // After creating our WithSpinner HOC, we also want
        // to set the loading state to false once all the
        // data is loaded
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            // We dispatch our fetchCollectionsSuccess function
            // and pass in the collectionsMap, so that it
            // is set as the payload
            dispatch(fetchCollectionsSuccess(collectionsMap));
        });
    }
}
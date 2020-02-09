// Import types
import ShopActionTypes from './shop.types';

// Create INITIAL_STATE
const INITIAL_STATE = {
    collections: null,
    // When we are at the stage of moving our
    // data fetch call from the Shop component
    // into our reducer instead, we want to have
    // an isFetching state, which declares whether
    // we are fetching our data or not. The initial
    // state of this property will be false. This
    // allows us to move the loading state into our
    // reducer too, so that we can load the spinner
    isFetching: false,
    // We also want to set our initial errorMessage
    // state so that we can pass in the error message
    // details if we the fetch call fails
    errorMessage: undefined
};

// Create reducer
const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // MODIFIED WHEN MOVING DATA FETCH CALL OUT OF
        // SHOP COMONENT INTO REDUCER
        // This is when our fetch collection starts,
        // which just changes the isFetching state to true
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        // This is when our fetch collection completes
        // successfully - it returns an object with the
        // state and the action payload which will be
        // the shop data from our firestore. It also
        // resets our isFetching value to false again
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            };
        // This is when our fetch collection fails - it
        // returns an object with the state and sets the
        // errorMessage prop to the action payload which
        // will be the error message string. It also
        // resets our isFetching value to false again
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        default:
            return state
    }
};

export default shopReducer;

// Import types
import ShopActionTypes from './shop.types';

// Create INITIAL_STATE
const INITIAL_STATE = {
    collections: null
};

// Create reducer
const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // Create a new case that takes the action type
        // and returns an object with the state and the
        // action payload
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            };
        default:
            return state
    }
};

export default shopReducer;

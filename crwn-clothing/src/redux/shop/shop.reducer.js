// Import SHOP_DATA
import SHOP_DATA from './shop.data';

// Create INITIAL_STATE
const INITIAL_STATE = {
    collections: SHOP_DATA
};

// Create reducer
const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action) {
        // Only need our default that returns the state
        default:
            return state
    }
};

export default shopReducer;

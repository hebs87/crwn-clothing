// combineReducers component allows us to
// combine all sub-reducers into one master
import { combineReducers } from 'redux';
// Import persistReducer to allow us to
// persist our root reducer state
import { persistReducer } from 'redux-persist';
// Import storage to allow us access to local storage
import storage from 'redux-persist/lib/storage';

// Import userReducer
import userReducer from './user/user.reducer';
// Import cartReducer
import cartReducer from './cart/cart.reducer';

// We need to create a persistConfig, which is a
// JSON object that contains the potential config
// that we want to use for redux to persist the state
const persistConfig = {
    // The key is defining at which point we want
    // to start storing everything (root in this case)
    key: 'root',
    // We pass storage in as the key, so we are
    // saying we want whatever storage object from
    // redux-persist we are trying to use is
    storage,
    // The whitelist is an array containing the
    // string names of the reducers that we want
    // to store - as the user is already being
    // persisted in Firebase, we only want to
    // store the cart
    whitelist: ['cart']
};

// After we've created persistConfig, we need to
// define the combineReducers as the rootReducer
// as we'll need to pass this in to persistReducer
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer
});

// Then we amend our export to export the persistReducer
// and we pass in our persistConfig and rootReducer
export default persistReducer(persistConfig, rootReducer);

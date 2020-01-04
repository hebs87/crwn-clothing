// combineReducers component allows us to
// combine all sub-reducers into one master
import { combineReducers } from 'redux';
// Import userReducer
import userReducer from './user/user.reducer';
// Import cartReducer
import cartReducer from './cart/cart.reducer';

export default combineReducers({
    user: userReducer,
    cart: cartReducer
});

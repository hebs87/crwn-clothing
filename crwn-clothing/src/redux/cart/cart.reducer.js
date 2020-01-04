// Import CartActionTypes
import CartActionTypes from './cart.types';
// Import addItemToCart
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    // For the CartDropdown toggle feature
    hidden: true,
    // For adding items to our cart (initial empty cart)
    cartItems: []
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                // instead of setting a payload, we can
                // just set the hidden value here to the
                // opposite of the current state.
                // This allows the CartIcon to act as a
                // toggle and change the state to the
                // opposite when clicked
                hidden: !state.hidden
            };
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            };
        default:
            return state;
    }
};

export default cartReducer;

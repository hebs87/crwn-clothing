// Import CartActionTypes
import CartActionTypes from './cart.types';
// Import addItemToCart
import { addItemToCart, removeItemFromCart } from './cart.utils';

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
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                // We use a filter method, which returns everything
                // that returns true
                cartItems: state.cartItems.filter( cartItem =>
                    // We compare the cartItem.id to the
                    // action.payload.id. If the IDs don't match,
                    // it returns true and those items remain in
                    // the cart. This causes a new object to be
                    // returned that contains all the cartItems
                    // that haven't been removed
                    cartItem.id !== action.payload.id
                )
            };
        // When the CLEAR_CART action type is dispatched, we
        // return an object in which we spread in the state
        // and clear the cart (set the cartItems value back
        // to an empty array)
        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            };
        default:
            return state;
    }
};

export default cartReducer;

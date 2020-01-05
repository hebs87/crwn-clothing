// Import CartActionTypes
import CartActionTypes from './cart.types';

// We don't need to pass a payload into this
// action, as we are just switching the state
// direcly in the reducer (the payload is an
// optional property)
export const toggleCartHidden = () => ({
    type: CartActionTypes.TOGGLE_CART_HIDDEN
});

// We create a new action that allows us to
// add items to the cart. We get the item
// and then we pass it into the payload as
// its value
export const addItem = item => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

// We create a new action that allows us to
// remove an item from the cart, regardless
// of its quantity. We get the item and
// then we pass it into the payload as
// its value
export const clearItemFromCart = item => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

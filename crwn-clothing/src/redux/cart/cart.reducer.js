// Import CartActionTypes
import CartActionTypes from './cart.types';

const INITIAL_STATE = {
    hidden: true
};

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CardActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                // instead of setting a payload, we can
                // just set the hidden value here to the
                // opposite of the current state.
                // This allows the CartIcon to act as a
                // toggle and change the state to the
                // opposite when clicked
                hidden: !state.hidden
            }
        default:
            return state;
    }
};

export default cartReducer;

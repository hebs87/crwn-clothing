// createSelector enables us to create output selectors
import { createSelector } from 'reselect';

// ALL SELECTOR NAMES HAVE TO STATE WITH 'select'

// Input selector - only takes one argument - the whole
// state and then just returns a slice of it
// Here, we pass in the root reducer, so the whole state,
// and then just return the cart section of it
const selectCart = state => state.cart;

// Output selectors - use the createSelector method from
// reselect and take the selectors and then another
// function that returns a drilled down piece of the
// state and create memoized functions
export const selectCartItems = createSelector(
    // 1st argument is an array/collection of selectors
    [selectCart],
    // 2nd argument is a function that returns the value
    // we want from the function
    // Here, we want the cart part of the state and then the
    // cartItems property from it
    cart => cart.cartItems
);

// Gets the hidden value from the cart reducer to
// enable toggling
export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    // We can pass in other output selectors here
    [selectCartItems],
    // We want to use the reduce call on the cartItems
    // from the previous function to calculate the count
    cartItems =>
        // We use the reduce function to loop over each
        // of the items in our cartItems object and add
        // them up.
        // The reduce() takes an accumulator and item as
        // its arguments and the number/value in the
        // function specifies the initial value of the
        // accumulator. Here, the initial value of the
        // accumulator is 0, which gets added to the
        // item quantity, then for the next iteration the
        // accumulator value is the new total, and so on
        // until all items are looped over and added
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                accumulatedQuantity + cartItem.quantity, 0
        )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
        cartItems.reduce(
            (accumulatedQuantity, cartItem) =>
                // We calculate the total price
                accumulatedQuantity + cartItem.quantity * cartItem.price, 0
        )
);

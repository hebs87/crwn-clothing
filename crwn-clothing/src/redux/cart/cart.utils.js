// We pass in our existing cartItems array and also the
// cartItemToAdd, because we want to compare their ID
// to decide whether to increase the quantity if they are
// the same item, or to add it to cart if it is a new item
export const addItemToCart = (cartItems, cartItemToAdd) => {
    // We do the comparison here and set it to the value
    // of existingCartItem.
    // We use the find() method, which returns the first
    // item found in the array that matches the condition
    // the we define within it
    const existingCartItem = cartItems.find(
        // This is a function to compare the two
        // values - the existing items' IDs and the
        // new item's ID. If it finds a match, it sets
        // the value of the const to that. If not,
        // it returns undefined
        cartItem => cartItem.id === cartItemToAdd.id
    );
    
    // If our existingCartItem exists, we map over the
    // items. We use map, as it returns a new array,
    // which is what we need to ensure that React knows
    // to re-render the component
    if(existingCartItem) {
        return cartItems.map(cartItem =>
            // We do the same and compare the two values
            cartItem.id === cartItemToAdd.id
                // If there is a match, we spread in the
                // object containing the cartItem and
                // increase the quantity by 1
                ? {...cartItem, quantity: cartItem.quantity + 1}
                // If they don't match, we return the cartItem
                // as it is
                : cartItem
        )
    }
    // If the existingCartItem doesn't exist, we want
    // to return a new array with the cartItems, and
    // also an object containing the cartItemToAd
    // and set its quantity to 1 - this enables the
    // quantity to be incremented
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};

import React from 'react';
// Import connect to enable binding the reducer
import { connect } from 'react-redux';
// Import toggleCartHidden action to enable toggling
import { toggleCartHidden } from '../../redux/cart/cart.actions';
// Import shopping bag icon svg
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// Import style sheet
import './cart-icon.styles.scss';

// Once we've bound the reducer to the component,
// We need to pass in the toggleCartHidden prop
// into it here, which will allow us to set it as
// the cart-icon's onClick function
// We pass in the itemCount from the mapStateToProps
// function to enable displaying the total count in
// the item-count span
const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ itemCount }</span>
    </div>
);

// We create a mapStateToProps function to pull
// the cartItems state from the cart reducer
const mapStateToProps = ({ cart: { cartItems } }) => ({
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
    itemCount: cartItems.reduce(
        (accumulatedQuantity, cartItem) =>
            accumulatedQuantity + cartItem.quantity, 0
    )
});

// Allows toggling of cart dropdown
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);

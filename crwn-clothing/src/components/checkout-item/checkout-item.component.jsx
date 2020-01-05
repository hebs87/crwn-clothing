import React from 'react';
// Import connect to bind action to component
import { connect } from 'react-redux';
// Import clearItemFromCart action to allow removing item from cart
import { clearItemFromCart } from '../../redux/cart/cart.actions';
// Import style sheet
import './checkout-item.styles.scss';

// We pass in the cartItem prop from the CheckoutPage component
// We need to do the explicit return in the function
// and then destructure our props in the function so that
// we still have access to the whole cartItem, which will
// let us pass it into the remove button to clear the item
// We also pass in our clearItem function which we created
// in the mapDispatchToProps function
const CheckoutItem = ({ cartItem, clearItem }) => {
    // Destructure the relevant props from the cartItem
    // so we can pass it into the relevant sections
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={ imageUrl } alt={ name } />
            </div>
            <span className='name'>{ name }</span>
            <span className='quantity'>
                <div className='arrow'>&#10094;</div>
                <span className='value'>{ quantity }</span>
                <div className='arrow'>&#10095;</div>
            </span>
            <span className='price'>&pound;{ price }</span>
            <div
                className='remove-button'
                onClick={() => clearItem(cartItem)}
            >
                &#10005;
            </div>
        </div>
    )
};

// This allows us to pass in the item to the
// clearItemFromCart action and dispatch the action
// to our reducer - to clear an item from the cart
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item))
});

export default connect(
    null,
    mapDispatchToProps
)(CheckoutItem);

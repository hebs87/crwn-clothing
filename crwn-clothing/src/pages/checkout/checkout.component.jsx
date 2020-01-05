import React from 'react';
// Import connect to enable pulling state
import { connect } from 'react-redux';
// Import createStructuredSelector
import { createStructuredSelector } from 'reselect';
// Import selectCartItems and selectCartTotal selectors
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
// Import style sheet
import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            // Map over our cartItems
            cartItems.map(cartItem =>
                cartItem.name
            )
        }
        <div className='total'>TOTAL: &pound;{total}</div>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);

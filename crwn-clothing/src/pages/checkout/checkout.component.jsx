import React from 'react';
// Import connect to enable pulling state
import { connect } from 'react-redux';
// Import createStructuredSelector
import { createStructuredSelector } from 'reselect';
// Import CheckoutItem
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// Import StripeCheckoutButton
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
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
            // Map over our cartItems and display them
            // in the CheckoutItem component
            cartItems.length ? (
                cartItems.map(cartItem =>
                    <CheckoutItem 
                        key={cartItem.id}
                        cartItem={cartItem}
                    />
                )
            ) : (
                <span className='empty-message'>
                    Your cart is empty
                </span>
            )
        }
        <div className='total'>TOTAL: &pound;{total}</div>
        <StripeCheckoutButton price={ total } />
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);

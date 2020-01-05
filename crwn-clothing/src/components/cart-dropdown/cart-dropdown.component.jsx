import React from 'react';
// Import connect to enable mapStateToProps
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import withRouter to enable button to route to CheckoutPage
import { withRouter } from 'react-router-dom';
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component';
// Import CartItem
import CartItem from '../cart-item/cart-item.component';
// Import selectCartItems selector to pass in to mapStateToProps
import { selectCartItems } from '../../redux/cart/cart.selectors';
// Import toggleCartHidden action to enable toggling the cart to hide
// when clicking the GO TO CHECKOUT BUTTON
import { toggleCartHidden } from '../../redux/cart/cart.actions'
// Import style sheet
import './cart-dropdown.styles.scss';

// We destructure our cartIems so we can pass
// it into our CartItem component
// We pass in history to enable routing to checkout page
// We pass in dispatch to enable passsing the toggle
// CartDropdown feature to the Button
const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                // We need an if statement here so we
                // conditionally render an 'empty' message
                // if there are no cart items, or we render
                // the cart items if there are any
                cartItems.length ? (
                    // We map out our cartItems
                    cartItems.map(cartItem =>
                        <CartItem key={ cartItem.id } item={ cartItem } />
                    )
                ) : (
                    // We display a message if cart is empty
                    <span className='empty-message'>
                        Your cart is empty
                    </span>
                )
            }
        </div>
        <CustomButton
            onClick={() => {
                // Route to the checkout route
                history.push('/checkout');
                // Dispatch the toggleCartHidden action to
                // toggle the cart to hidden
                dispatch(toggleCartHidden());
            }}
        >
            GO TO CHECKOUT
        </CustomButton>
    </div>
);

// We create a mapStateToProps function to pull
// the cartItems. We pass in the whole state
// and the selector then gets the relevant part
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

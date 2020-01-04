import React from 'react';
// Import connect to enable mapStateToProps
import { connect } from 'react-redux';
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component';
// Import CartItem
import CartItem from '../cart-item/cart-item.component';
// Import style sheet
import './cart-dropdown.styles.scss';

// We destructure our cartIems so we can pass
// it into our CartItem component
const CartDropdown = ({ cartItems }) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {
                // We map out our cartItems
                cartItems.map(cartItem =>
                    <CartItem key={ cartItem.id } item={ cartItem } />
                )
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

// We destructure out cartItems from our cart and
// return the prop
const mapStateToProps = ({ cart: { cartItems } }) => ({
    cartItems
});

export default connect(mapStateToProps)(CartDropdown);

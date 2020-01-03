import React from 'react';
// Import CustomButton
import CustomButton from '../custom-button/custom-button.component';
// Import style sheet
import './cart-dropdown.styles.scss';

const CartDropdown = () => (
    <div className='cart-dropdown'>
        <div className='cart-items' />
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
);

export default CartDropdown;
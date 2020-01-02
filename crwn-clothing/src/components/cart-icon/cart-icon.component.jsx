import React from 'react';
// Import shopping bag icon svg
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// Import style sheet
import './cart-icon.styles.scss';

const CartIcon = () => (
    <div className='cart-icon'>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
);

export default CartIcon;

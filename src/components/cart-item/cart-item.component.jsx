import React from 'react';
// Import style sheet
import './cart-item.styles.scss';

// We want to get our whole item and also destructure the
// properties from it that we need. The item here is what
// we get from the cartItems in the cart-dropdown.component.jsx
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <div className='cart-item'>
        <img src={ imageUrl } alt={ name } />
        <div className='item-details'>
            <span className='name'>
                { name }
            </span>
            <span className='price'>
                { quantity } x &pound;{ price }
            </span>
        </div>
    </div>
);

export default CartItem;

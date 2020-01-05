import React from 'react';
// Import style sheet
import './checkout-item.styles.scss';

// We pass in the cartItem prop from the CheckoutPage component
// and destructure the props that we need from it, which we
// pass in to the relevant sections of our component
const CheckoutItem = ({ cartItem: { name, imageUrl, price, quantity } }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={ imageUrl } alt={ name } />
        </div>
        <span className='name'>{ name }</span>
        <span className='quantity'>{ quantity }</span>
        <span className='price'>{ price }</span>
        <div className='remove-button'>
            &#10005;
        </div>
    </div>
);

export default CheckoutItem;

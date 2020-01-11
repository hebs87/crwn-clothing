import React from 'react';
// Import style sheet
import {
    CartItemContainer,
    CartItemImage,
    ItemDetailsContainer
} from './cart-item.styles';

// We want to get our whole item and also destructure the
// properties from it that we need. The item here is what
// we get from the cartItems in the cart-dropdown.component.jsx
const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
    <CartItemContainer>
        <CartItemImage src={ imageUrl } alt={ name } />
        <ItemDetailsContainer>
            <span>{ name }</span>
            <span>{ quantity } x &pound;{ price }</span>
        </ItemDetailsContainer>
    </CartItemContainer>
);

export default CartItem;

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

// React.memo memoizes the component. Currently, when we add new
// items to the cart, a new array of cartItems is being passed in
// to the CartDropdown each time, even if a different item is added
// (e.g. 5 items are added – 3 x jeans and 2 x shirts. The first
// jeans item renders all 5 times, instead of 3 times when it count
// increases). We want our cart item to only re-render if its value
// changes (e.g. Jeans only re-renders when it is added or if its
// quantity changes. Memoizing the CartItem component, means that
// the component is only re-rendered when its value changes
export default React.memo(CartItem);

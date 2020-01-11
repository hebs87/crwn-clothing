import React from 'react';
// Import connect to bind action to component
import { connect } from 'react-redux';
// Import clearItemFromCart, addItem, removeItem actions to allow adding/removing/clearing items from cart
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions';
// Import styled components
import {
    CheckoutItemContainer,
    ImageContainer,
    TextContainer,
    QuantityContainer,
    RemoveButtonContainer
} from './checkout-item.styles';

// We pass in the cartItem prop from the CheckoutPage component
// We need to do the explicit return in the function
// and then destructure our props in the function so that
// we still have access to the whole cartItem, which will
// let us pass it into the remove button to clear the item
// We also pass in our clearItem function which we created
// in the mapDispatchToProps function
// The addItem prop allows us to call the function to add an item
// The removeItem prop allows us to call the function to remove
// or clear the item, depending on its quantity
const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    // Destructure the relevant props from the cartItem
    // so we can pass it into the relevant sections
    const { name, imageUrl, price, quantity } = cartItem;
    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={ imageUrl } alt={ name } />
            </ImageContainer>
            <TextContainer>{ name }</TextContainer>
            <QuantityContainer>
                <div onClick={() => removeItem(cartItem)}>
                    &#10094;
                </div>
                <span>{ quantity }</span>
                <div onClick={() => addItem(cartItem)}>
                    &#10095;
                </div>
            </QuantityContainer>
            <TextContainer>&pound;{ price }</TextContainer>
            <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
                &#10005;
            </RemoveButtonContainer>
        </CheckoutItemContainer>
    );
};

// This allows us to pass in the item to the
// actions and dispatch them to our reducer
// to add/remove/clear an item from the cart
const mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(clearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(CheckoutItem);

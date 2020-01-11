import React from 'react';
// Import connect to enable binding the reducer
import { connect } from 'react-redux';
// Import createStructured selector to allow multiple selector calls
import { createStructuredSelector } from 'reselect';
// Import toggleCartHidden action to enable toggling
import { toggleCartHidden } from '../../redux/cart/cart.actions';
// Import selectCartItemsCount selector to pass in to mapStateToProps
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
// Import styled components
import {
    CartIconContainer,
    ShoppingIcon,
    ItemCountContainer
} from './cart-icon.styles';

// Once we've bound the reducer to the component,
// We need to pass in the toggleCartHidden prop
// into it here, which will allow us to set it as
// the cart-icon's onClick function
// We pass in the itemCount from the mapStateToProps
// function to enable displaying the total count in
// the item-count span
const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <CartIconContainer onClick={toggleCartHidden}>
        <ShoppingIcon />
        <ItemCountContainer>{ itemCount }</ItemCountContainer>
    </CartIconContainer>
);

// We create a mapStateToProps function to pull
// the itemCount. We pass in the whole state
// and the selector then gets the relevant part
const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

// Allows toggling of cart dropdown
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);

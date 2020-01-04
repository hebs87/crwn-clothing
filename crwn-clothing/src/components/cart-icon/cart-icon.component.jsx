import React from 'react';
// Import connect to enable binding the reducer
import { connect } from 'react-redux';
// Import toggleCartHidden action to enable toggling
import { toggleCartHidden } from '../../redux/cart/cart.actions';
// Import shopping bag icon svg
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
// Import style sheet
import './cart-icon.styles.scss';

// Once we've bound the reducer to the component,
// We need to pass in the toggleCartHidden prop
// into it here, which will allow us to set it as
// the cart-icon's onClick function
const CartIcon = ({ toggleCartHidden }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>0</span>
    </div>
);

// Allows toggling of cart dropdown
const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

// Pass in null as the connect default and then the
// mapDispatchToProps function as the 2nd argument
export default connect(
    null,
    mapDispatchToProps
)(CartIcon);

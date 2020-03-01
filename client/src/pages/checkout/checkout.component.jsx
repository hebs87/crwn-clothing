import React from 'react';
// Import connect to enable pulling state
import { connect } from 'react-redux';
// Import createStructuredSelector
import { createStructuredSelector } from 'reselect';
// Import CheckoutItem
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
// Import StripeCheckoutButton
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
// Import selectCartItems and selectCartTotal selectors
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
// Import styled components
import {
    CheckoutPageContainer,
    CheckoutHeaderContainer,
    HeaderBlockContainer,
    EmptyMessageContainer,
    TotalContainer,
    TestWarningContainer,
    ButtonContainer
} from './checkout.styles';

const CheckoutPage = ({ cartItems, total }) => (
    <CheckoutPageContainer>
        <CheckoutHeaderContainer>
            <HeaderBlockContainer>
                <span>Product</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Description</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Quantity</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Price</span>
            </HeaderBlockContainer>
            <HeaderBlockContainer>
                <span>Remove</span>
            </HeaderBlockContainer>
        </CheckoutHeaderContainer>
        {
            // Map over our cartItems and display them
            // in the CheckoutItem component
            // If there are cartItems, display them.
            // If not, display the empty-message
            cartItems.length ? (
                cartItems.map(cartItem =>
                    <CheckoutItem 
                        key={cartItem.id}
                        cartItem={cartItem}
                    />
                )
            ) : (
                <EmptyMessageContainer>
                    Your cart is empty
                </EmptyMessageContainer>
            )
        }
        <TotalContainer>
            TOTAL: &pound;{total}
        </TotalContainer>
        <TestWarningContainer>
            *Please use the following test credit card for payments*
            <br />
            4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
        </TestWarningContainer>
        <ButtonContainer>
            <StripeCheckoutButton price={ total } />
        </ButtonContainer>
    </CheckoutPageContainer>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);

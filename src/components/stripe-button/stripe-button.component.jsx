import React from 'react';
// Import StripeCheckout
import StripeCheckout from 'react-stripe-checkout';

// We need to create an onToken action here, but for us,
// it's just to display an alert that the payment has
// been successful. We would need to configure this further
// if we want to handle the charge with our backend though
const onToken = token => {
    alert('Payment Successful');
}

// We create our component which renders the StripeCheckoutButton
// which takes the price prop (this will be the total that is
// passed in from the CheckoutPage component)
const StripeCheckoutButton = ({ price }) => {
    // Stripe needs the price in pence, so we need
    // to convert our pounds price to pence instead
    const priceForStripe = price * 100;
    // This is the publishable key in stripe
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
    // Now we return the stripe button and pass in the
    // properties that we need
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is £${ price }`}
            amount={ priceForStripe }
            currency='GBP'
            panelLabel='Pay Now'
            token={ onToken }
            stripeKey={ publishableKey }
        />
    );
};

export default StripeCheckoutButton;

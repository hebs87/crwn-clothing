import React from 'react';
// Import StripeCheckout
import StripeCheckout from 'react-stripe-checkout';
// Import axios to enable token creation
import axios from 'axios';

// We create our component which renders the StripeCheckoutButton
// which takes the price prop (this will be the total that is
// passed in from the CheckoutPage component)
const StripeCheckoutButton = ({ price }) => {
    // Stripe needs the price in pence, so we need
    // to convert our pounds price to pence instead
    const priceForStripe = price * 100;
    // This is the publishable key in stripe. As it is stored
    // in the .env file, we have to use process.env to access it
    const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

    // We need to create an onToken action here, which
    // creates a token that will be passed to our backend
    // server. It will hold all the details that the
    // server needs to make a valid charge to Stripe
    const onToken = token => {
        // Axios is a function that receives an object
        // that has all of the actual properties that we
        // want to pass to our backend, in order for it
        // to know what type of request we’re trying to make
        axios({
            // We specify the URL of payment, so it will
            // append payment to the end of the URL we are
            // currently at
            url: 'payment',
            // Specify the method, which is post
            method: 'post',
            // The data represents the actual data that we
            // want to pass through to the backend
            data: {
                // The amount goes to the priceForStripe const
                amount: priceForStripe,
                // The token will be the token object
                token
            }
        // Now we check what type of response we are getting -
        // success or error
        }).then(response => {
            // If it is successful, we display a success alert
            alert('Payment successful');
        }).catch(error => {
            // If it is an error, we console log the error
            console.log('Payment error ' + JSON.parse(error));
            // We also display an error alert for the user
            alert(
                'There was an issue with your payment. Please make sure you use the provided credit card.'
            );
        });
    };

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

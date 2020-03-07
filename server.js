// We need to import in the files and libraries
// We do this by using the require() JS method,
// which is node's version of ES6's import
// We set the result to a const value
// Import node express
const express = require('express');
// Import cors to enable cross-origin requests
const cors = require('cors');
// Import bodyParser
const bodyParser = require('body-parser');
// Import path - native node module that lets us
// dynamically build specific paths
const path = require('path');
// Import compression to enable gzipping when deploying
// project to Heroku
const compression = require('compression');
// Call enforce, which is what we get back from sslify
// to force any HTTP requests to HTTPS instead
const enforce = require('express-sslify');

// If we're in production, this loads our .env into
// our process environment 
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Import stripe, which gives us back a function - the function takes
// the secret key as the first argument. So here, we say that we want
// to get the function that the stripe module gives us and then invoke
// it immediately and pass it the secret key. This enables us to
// leverage the functionality to make charges to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Instantiate a new express application
const app = express();

// We set the port as the process port, if there is one,
// if there isn't then we use 5000
const port = process.env.PORT || 5000;

// Use compression to enable gzipping when deploying app to Heroku
app.use(compression());
// Use bodyParser to convert any API request data to json
app.use(bodyParser.json());
// Use bodyParser to encode any url strings, so they don't
// contain any illegal characters
app.use(bodyParser.urlencoded({ extended: true }));
// Enforce HTTPS for our app, if the user tries HTTP
app.use(enforce.HTTPS({trustProtoHeader: true}));

// Enable cors so that our frontend can speak to our backend
// which are both on different ports
app.use(cors());

// Tell Heroku what to send back to the client on request
// When in production, we want to serve all our static files
// so we use path to point to the client/build file
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // When we receive a get request, for any URL ('*'), we want
    // to use a function that gets a request (the URL) and sends
    // a response, which is to send the index.html file in our
    // client/build dir that holds the links to all the
    // node_modules that we need to run our frontend app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
};

// After all the above code gets run, we want to start listening
// on port 5000, and display any error if there is one
app.listen(port, error => {
    if (error) throw error;
    // This gets logged if there is no error
    console.log('Server running on port ' + port);
});

// When our app makes a request for service worker (for a PWA),
// we want to resolve it by giving it the path to the serviceWorker
// file in the client/build dir, so we say .. to go up a level,
// then into the build dir and get the relevant file
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

//-------------------- STRIPE PAYMENT ROUTE --------------------
// We use the app object and declare the type of route (post in
// this instance) and we specify the route that we want to send
// the request to (/payment). We then pass the post method a
// function that gets a request object (the actual token that we
// need in order to make the charge) from the frontend, and
// then a response from the Stripe API that we then want to send
// back to the client on the frontend
app.post('/payment', (req, res) => {
    // We build the appropriate body object that we pass to
    // Stripe using values that we get from the token - this
    // will be the value for the req parameter
    const body = {
        // The source value is all the things we need from
        // Stripe, which we can get from the token id - this
        // is held on the body param of the req object
        source: req.body.token.id,
        // The amount value is the total cost of the charges
        amount: req.body.amount,
        // The currency value is the currency we want to use
        currency: 'GBP'
    };

    // We call our stripe library to create a charge and pass
    // it the body object that we previously created as the
    // first param. The second param is a callback function
    // in which we get the response, which will either be an
    // error or a response (success) that we then need to send
    // back to the client on the frontend
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            // We want to set the response status as 500 (error)
            // and send the actual error message to the client
            res.status(500).send({ error: stripeErr });
        } else {
            // We want to set the response status as 200 (success)
            // and send the actual response message to the client
            res.status(200).send({ success: stripeRes });
        }
    });
});

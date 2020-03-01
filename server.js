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

// If we're in production, this loads our .env into
// our process environment 
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

// Instantiate a new express application
const app = express();

// We set the port as the process port, if there is one,
// if there isn't then we use 5000
const port = process.env.port || 5000;

// Use bodyParser to convert any API request data to json
app.use(bodyParser.json());
// Use bodyParser to encode any url strings, so they don't
// contain any illegal characters
app.use(bodyParser.urlencoded({ extended: true }));

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
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    });
};

// After all the above code gets run, we want to start listening
// on port 5000, and display any error if there is one
app.listen(port, error => {
    if (error) throw error;
    // This gets logged if there is no error
    console.log('Server running on port ' + port);
});

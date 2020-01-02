import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import BrowserRouter to allow routing functionality
import { BrowserRouter } from 'react-router-dom';
// Import Provider to give our app access to Redux store and reducers
import { Provider } from 'react-redux';

// We need to wrap our App Component with the BrowserRouter
// This gives the App the routing functionality
ReactDOM.render(
    <Provider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

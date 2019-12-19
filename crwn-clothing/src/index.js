import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import BrowserRouter to allow routing functionality
import { BrowserRouter } from 'react-router-dom'

// We need to wrap our App Component with the BrowserRouter
// This gives the App the routing functionality
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

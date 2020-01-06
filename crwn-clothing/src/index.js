import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// Import BrowserRouter to allow routing functionality
import { BrowserRouter } from 'react-router-dom';
// Import Provider to give our app access to Redux store and reducers
import { Provider } from 'react-redux';
// Import PersistGate for local storage
import { PersistGate } from 'redux-persist/integration/react';
// Import store and persistor so we can pass it in to our Provider
import { store, persistor } from './redux/store';

// We need to wrap our App Component with the BrowserRouter
// This gives the App the routing functionality
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate persistor={ persistor }>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

import { createStore, applyMiddleware } from 'redux';
// Import persistStore to allow our browser to cache the store
import { persistStore } from 'redux-persist';
// Import logger, which console logs the input of the
// actions to help us better understand what is happening
import logger from 'redux-logger';
// Import thunk to enable reusability of asynchronous actions
// (to get the shop data from the firestore)
// No longer needed if we are using saga instead
// import thunk from 'redux-thunk';
// Import createSagaMiddleware to enable use of sagas
import createSagaMiddleware from 'redux-saga';

// Import our sagas
import { fetchCollectionsStart } from './shop/shop.sagas';

// Import our rootReducer
import rootReducer from './root-reducer';

// To use sagas, we need to first call the
// createSagamiddleware function and store it in a variable
const sagaMiddleware = createSagaMiddleware();

// The middlewares that our store expects from redux is
// an array with any number of parameters that we want
// As we only want the logger middleware in our development
// environment, we set this as a blank array first
// Once we've installed redux-thunk and imported thunk,
// we want to push it into our middlewares array. However,
// we don't need this when using sagas instead
// When using sagas, we can push the sagaMiddleware variable
// into the middlewares instead
const middlewares = [sagaMiddleware];

// If we are in the development environment, we will push
// the logger middleware into the empty middlewares array
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
};

// We create our store and use the createStore method,
// which takes two parameters - our rootReducer and also
// the return value of applyMiddleware, in which we spread
// in our middlewares (we do it this way to make it more
// scalable so that we don't have to pass in each
// individual parameter)
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Once our saga middleware is called, we need to call it and
// pass in the individual sagas that we want to run
sagaMiddleware.run(fetchCollectionsStart);

// We want to create a persistor and pass in our store
// to enable it to persist in either local or session storage
export const persistor = persistStore(store);

// Finally, we want to export an object that contains
// our store and the persistor
export default { store, persistor };

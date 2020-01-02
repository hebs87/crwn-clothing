import { createStore, applyMiddleware } from 'redux';
// Import logger, which console logs the input of the
// actions to help us better understand what is happening
import logger from 'redux-logger';
// Import our rootReducer
import rootReducer from './root-reducer';

// The middlewares that our store expects from redux is
// an array with any number of parameters that we want
const middlewares = [logger];

// We create our store and use the createStore method,
// which takes two parameters - our rootReducer and also
// the return value of applyMiddleware, in which we spread
// in our middlewares (we do it this way to make it more
// scalable so that we don't have to pass in each
// individual parameter)
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;

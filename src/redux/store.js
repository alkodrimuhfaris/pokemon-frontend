import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
// import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;

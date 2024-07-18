import { compose, createStore, applyMiddleware } from "redux";
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { rootSaga } from "./root-saga";
import { rootReducer } from "./rootReducer.js";

const sagaMiddleware = createSagaMiddleware()

const middleWares = [process.env.NODE_ENV !== 'production' && logger, sagaMiddleware]
    .filter(Boolean);

const composedEnhancer =
    (process.env.NODE_ENV !== 'production'
        && window
        && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
    || compose;

const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

sagaMiddleware.run(rootSaga);

import * as Redux from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { appReducer } from '../reducers/index';
import { AppState } from '../types/index';

export function createStore(/*history, */ initialState: AppState) {
    const sagaMiddleware = createSagaMiddleware();

    // TODO-jt-170530 do environment handling
    const middlewares = [
        sagaMiddleware,
        // routerMiddleware(history),
        createLogger({
            collapsed: true,
        }),
    ];

    const store = Redux.createStore<AppState>(
        appReducer,
        initialState,
        Redux.applyMiddleware(...middlewares),
    );

    // NOTE-jt-170530 also exposing sagaMiddleware so consumer
    // can decide which sagas to run
    // (extending redux.Store interface proved to be cumbersome)
    return { store, sagaMiddleware };
}

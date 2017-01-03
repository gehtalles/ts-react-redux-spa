import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './core/components/App';
import { Provider } from 'react-redux';
import { createStore } from './core/store/index';
import { AppState } from './core/types/index';
import { rootSaga, bootstrapSaga } from './core/sagas/index';

import './index.css';

const preloadedState = {};
const { store, sagaMiddleware } = createStore(preloadedState as AppState);

// NOTE-jt-170530 SAGA WATCHERS NEED TO BE STARTED BEFORE RENDER
sagaMiddleware.run(rootSaga);
sagaMiddleware.run(bootstrapSaga).done.then(() => {
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>,
        document.getElementById('root') as HTMLElement,
    );
});

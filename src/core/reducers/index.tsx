import { combineReducers } from 'redux';

import { AppState } from '../types/index';

import { enthusiasm } from '../../modules/hello/reducers/index';
// import { routerReducer } from 'react-router-redux';
import { endpoints } from '../../lib/endpoints/reducers/index';
import queryResults from '../../lib/resources/reducers/queryResults';
// import { auth } from 'lib/token-based-auth/reducers';

export const appReducer = combineReducers<AppState>({
    enthusiasm,
    // auth,
    endpoints,
    queryResults,
    // routing: routerReducer,
});

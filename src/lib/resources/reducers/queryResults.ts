// tslint:disable no-any
import RemoteData from '../types/RemoteData';
import { QUERY_RESULT_CHANGED } from '../constants/index';
import { QueryResultMap, URI, Error } from '../types/index';
import { QueryResultChanged } from '../actions/index';
import { Map } from 'immutable';

export default function queryResults(
    state: QueryResultMap = Map<URI, RemoteData<Error, any>>(),
    action: QueryResultChanged<URI, RemoteData<Error, any>>,
): QueryResultMap {
    switch (action.type) {
        case QUERY_RESULT_CHANGED:
            const { payload: [query, queryResult] } = action;
            const newerState = state.set(query, queryResult);
            return newerState;
        default:
            return state;
    }
}

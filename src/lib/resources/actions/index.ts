import * as constants from '../constants';

import RemoteData from '../types/RemoteData';
import { URI } from '../types/index';

export interface ResourceQueried {
    readonly type: constants.RESOURCE_QUERIED;
    readonly payload: URI;
}

export interface QueryResultChanged<E, T> {
    readonly type: constants.QUERY_RESULT_CHANGED;
    readonly payload: [URI, RemoteData<E, T>];
}

export type ResourceAction<E, T> = QueryResultChanged<E, T> | ResourceQueried;

export function queryResource(uri: URI): ResourceQueried {
    return {
        type: constants.RESOURCE_QUERIED,
        payload: uri,
    };
}

export function changeQueryResult<E, T>(
    uri: URI ,
    stateChange: RemoteData<E, T>,
): QueryResultChanged<E, T> {
    return {
        type: constants.QUERY_RESULT_CHANGED,
        payload: [uri, stateChange],
    };
}

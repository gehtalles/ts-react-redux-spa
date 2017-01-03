// tslint:disable no-any
import { select, call, put, takeEvery, PutEffect } from 'redux-saga/effects';
import * as R from 'ramda';

import RemoteData from '../types/RemoteData';
import { changeQueryResult } from '../actions';
import { RESOURCE_QUERIED } from '../constants/index';
import { ResourceQueried, QueryResultChanged } from '../actions/index';
import { QueryResultMap, URI, Error } from '../types/index';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const checkForError = R.ifElse(
    R.prop('ok'),
    R.identity,
    response => Promise.reject(`${response.status} - ${response.statusText}`),
);

const fetchJSON = (url: string) =>
    fetch(url, { method: 'get', headers })
        .then(checkForError)
        .then(res => res.json());

function selectQueryResult(
    { queryResults }: { queryResults: QueryResultMap },
    uri: URI,
): any {
    return queryResults.get(uri) as RemoteData<Error, any> || RemoteData.notAsked<Error, any>();
}

type QueryResultChangedEffect = PutEffect<QueryResultChanged<Error, any>>;

function* queryResource({ payload: uri }: ResourceQueried) {
    try {

        const previousQueryResult:  RemoteData<Error, any> = yield select(selectQueryResult, uri);
        yield previousQueryResult.caseOf<QueryResultChangedEffect | null>({
            notAsked: () => put(changeQueryResult(uri, RemoteData.loading<Error, any>())),
            loading: () => null,
            refreshing: () => null,
            failure: () => put(changeQueryResult(uri, RemoteData.loading<Error, any>())),
            success: (previous) => put(changeQueryResult(uri, RemoteData.refreshing<Error, any>(previous))),
        });

        // TODO-jt sign request

        // FIXME-jt add timeout constraint as race
        const rawResult = yield call(fetchJSON, uri);
        yield put(changeQueryResult(uri, RemoteData.success<Error, any>(rawResult)));

        // TODO-jt store resource entities

    } catch (error) {
        yield put(changeQueryResult(uri, RemoteData.failure<Error, any>(error)));

        // TODO-jt handle auth error (e.g. 401)
    }
}

export default function* queryWatcher() {
    // NOTE-jt-170530 take EVERY because all queries go through here
    yield takeEvery(RESOURCE_QUERIED, queryResource);
}

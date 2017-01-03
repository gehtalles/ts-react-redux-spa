import { call, fork, all } from 'redux-saga/effects';
import { Effect } from 'redux-saga';
import { fetchEndpointTemplates } from '../../lib/endpoints/sagas/index';
import queryWatcher from '../../lib/resources/sagas/query';

// hydrate state with prerequisites here
// if one of these fails the app cant start => fail early
export function* bootstrapSaga(): IterableIterator<Effect> {
    yield call(fetchEndpointTemplates);
}

export function* rootSaga(): IterableIterator<Effect> {
    try {
        yield all([
            fork(queryWatcher),
        ]);
    } catch (error) {
        console.log(error); // tslint:disable-line
    }
}

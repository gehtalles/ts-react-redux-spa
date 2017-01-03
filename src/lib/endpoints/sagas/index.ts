import { Effect } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { endpointsReceived } from '../actions/index';
import { EndpointTemplate } from '../types/index';
import { API_HOST } from '../../constants';

// TODO-jt-170620 replace this with response
const HARDCODED_URLS: [string, string][] = [
    ['smarties', `${API_HOST}/smarties{/id}`],
];

export function* fetchEndpointTemplates(): IterableIterator<Effect> {
    // const endpointTemplates = yield call(fetchJSON, API_HOST)
    const endpointTemplates: Map<string, EndpointTemplate> = new Map(HARDCODED_URLS);
    yield put(endpointsReceived(endpointTemplates));
}

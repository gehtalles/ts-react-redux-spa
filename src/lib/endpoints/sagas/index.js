const { put, call } = require('redux-saga/effects')
// const { fetchJSON } = require('../../http')
const { endpointsReceived } = require('../actions')

// const { constants: { API_HOST } } = require('../../base')

export function* fetchEndpointTemplates() {
    // const endpointTemplates = yield call(fetchJSON, API_HOST)
    const endpointTemplates = {
        hardcoded: 'someUrl',
    }
    yield put(endpointsReceived(endpointTemplates))
}

import { Map } from 'immutable';
import { EndpointAction } from '../actions';
import { EndpointState, EndpointTemplate, ResourceName } from '../types/index';
import { ENDPOINT_TEMPLATES_FULFILLED } from '../constants/index';

const INITIAL_STATE = Map<ResourceName, EndpointTemplate>();

export function endpoints(state: EndpointState = INITIAL_STATE, action: EndpointAction): EndpointState {
    switch (action.type) {
        case ENDPOINT_TEMPLATES_FULFILLED:
            return Map<ResourceName, EndpointTemplate>(action.payload);
        default:
            return state;
    }
}

import * as constants from '../constants';
import { EndpointTemplate } from '../types';

export interface EndpointsReceived {
    type: constants.ENDPOINT_TEMPLATES_FULFILLED;
    payload: Map<string, EndpointTemplate>;
}

export type EndpointAction = EndpointsReceived;

export function endpointsReceived(templates: Map<string, EndpointTemplate>): EndpointsReceived {
    return {
        type: constants.ENDPOINT_TEMPLATES_FULFILLED,
        payload: templates,
    };
}

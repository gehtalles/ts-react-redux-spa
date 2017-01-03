import { EndpointState, EndpointTemplate } from '../types/index';

export function getEndpointTemplate(
    resourceType: string,
    state: { endpoints: EndpointState },
): EndpointTemplate {
    return state.endpoints[resourceType];
}

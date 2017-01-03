import { Map } from 'immutable';

export type ResourceName = string;
export type EndpointTemplate = string;
export type EndpointState = Map<ResourceName, EndpointTemplate>;

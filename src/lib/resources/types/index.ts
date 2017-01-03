// tslint:disable no-any
import RemoteData from './RemoteData';
import { Map } from 'immutable';

export interface ResourceQuery {
    endpoint: string;
    id?: string;
}
export type ResourceId = string;
export type URI = string;
export type Error = string;
export type QueryResultMap = Map<URI, RemoteData<Error, any>>;

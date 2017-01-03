import { Maybe } from 'tsmonad';

import { ResourceQuery, URI, Error } from '../types/index';
import { EndpointState } from '../../endpoints/types/index';

function maybe<T>(value: T | undefined) {
    return value !== undefined
        ? Maybe.maybe<T>(value)
        : Maybe.nothing<T>();
}

export function constructURI(q: ResourceQuery, e: EndpointState): Maybe<URI> {
    return maybe<string>((e.get(q.endpoint)))
        .map(uriTemplate => {
            if (q.id !== undefined) {
                return uriTemplate.replace('{/id}', '/' + q.id);
            }
            return uriTemplate.replace('{/id}', '');
        });
}

export function constructErrorString(q: ResourceQuery): Error {
    return `uri template could not be expanded. query was ${JSON.stringify(q)}`;
}

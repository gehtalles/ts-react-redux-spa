// tslint:disable no-any
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Maybe } from 'tsmonad';

import RemoteData, { toUnsafe, UnsafeRemoteData } from '../types/RemoteData';
import { QueryResultMap, ResourceQuery, URI, Error } from '../types/index';
import { EndpointState } from '../../endpoints/types/index';
import { queryResource, ResourceQueried } from '../actions/index';
import { constructURI, constructErrorString } from '../utils/query';

export interface OnWillMountDispatch {
    onWillMount: (uri: URI) => ResourceQueried;
}

export interface UnsafeRemoteDataProps<X, Y> {
    uri: Maybe<URI>;
    remoteData: UnsafeRemoteData<X, Y>;
}

// NOTE-jt-170612 unused but makes interface clear
export interface UnsafeRemoteDataOwnProps {
}

type UnsafeProps<X, Y> = UnsafeRemoteDataProps<X, Y> & OnWillMountDispatch & UnsafeRemoteDataOwnProps;

export default function withUnsafeRemoteData<D>(
    query: ResourceQuery,
    InnerComponent: React.ComponentClass<any> | React.StatelessComponent<any>,
    actionCreator: (uri: URI) => ResourceQueried = queryResource,
): React.ComponentClass<UnsafeRemoteDataOwnProps> {

    function mapStateToProps(
        { queryResults, endpoints }: { queryResults: QueryResultMap, endpoints: EndpointState },
    ): UnsafeRemoteDataProps<Error, D> {
        const maybeURI = constructURI(query, endpoints);
        const result = maybeURI.caseOf<RemoteData<Error, D>>({
            just: (uri) => queryResults.get(uri) as RemoteData<Error, D> || RemoteData.notAsked<Error, D>(),
            nothing: () => RemoteData.failure<Error, D>(constructErrorString(query)),
        });
        return {
            uri: maybeURI,
            remoteData: toUnsafe<Error, D>(result),
        };
    }

    function mapDispatchToProps(dispatch: Dispatch<Function>): OnWillMountDispatch {
        return {
            onWillMount: (uri: URI) => dispatch(actionCreator(uri)),
        };
    }

    class WithUnsafeRemoteData extends React.Component<UnsafeProps<Error, D>, void> {
        componentWillMount() {
            // TODO-jt-170626 use a Writer?
            this.props.uri.map(uri => this.props.onWillMount(uri));
        }

        render() {
            return <InnerComponent {...this.props} />;
        }
    }
    return connect<UnsafeRemoteDataProps<Error, D>, OnWillMountDispatch, UnsafeRemoteDataOwnProps>(
        mapStateToProps,
        mapDispatchToProps,
    )(WithUnsafeRemoteData);
}

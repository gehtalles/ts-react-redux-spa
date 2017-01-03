import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Maybe } from 'tsmonad';

import RemoteData, { RemoteDataPatterns } from '../types/RemoteData';
import { QueryResultMap, ResourceQuery, URI, Error } from '../types/index';
import { EndpointState } from '../../endpoints/types/index';
import { queryResource, ResourceQueried } from '../actions/index';
import { constructURI, constructErrorString } from '../utils/query';

export interface OnWillMountDispatch {
    onWillMount: (uri: URI) => ResourceQueried;
}

export interface RemoteDataProps<X, Y> {
    uri: Maybe<URI>;
    remoteData: RemoteData<X, Y>;
}

// NOTE-jt-170612 unused but makes interface clear
export interface RemoteDataOwnProps {
}

type RemtDataProps<X, Y> = RemoteDataProps<X, Y> & OnWillMountDispatch & RemoteDataOwnProps;

export default function withRemoteData<D>(
    query: ResourceQuery,
    caseAnalysis: RemoteDataPatterns<Error, D, JSX.Element>,
    actionCreator: (uri: URI) => ResourceQueried = queryResource,
): React.ComponentClass<RemoteDataOwnProps> {

    function mapStateToProps(
        { queryResults, endpoints }: { queryResults: QueryResultMap, endpoints: EndpointState },
    ): RemoteDataProps<Error, D> {
        const maybeURI = constructURI(query, endpoints);
        const result = maybeURI.caseOf<RemoteData<Error, D>>({
            just: (uri) => queryResults.get(uri) as RemoteData<Error, D> || RemoteData.notAsked<Error, D>(),
            nothing: () => RemoteData.failure<Error, D>(constructErrorString(query)),
        });
        return {
            uri: maybeURI,
            remoteData: result,
        };
    }

    function mapDispatchToProps(dispatch: Dispatch<Function>): OnWillMountDispatch {
        return {
            onWillMount: (uri: URI) => dispatch(actionCreator(uri)),
        };
    }

    class WithRemoteData extends React.Component<RemtDataProps<Error, D>, void> {
        componentWillMount() {
            // TODO-jt-170626 use a Writer?
            this.props.uri.map(uri => this.props.onWillMount(uri));
        }

        render() {
            // NOTE-jt-170613 if you find yourself in the situation
            // where you want props to be handed down, please reconsider
            // MAPping them in here before doing the case analysis
            // ... but <connect> used in children should also do the trick
            return this.props.remoteData.caseOf(caseAnalysis);
        }
    }
    return connect<RemoteDataProps<Error, D>, OnWillMountDispatch, RemoteDataOwnProps>(
        mapStateToProps,
        mapDispatchToProps,
    )(WithRemoteData);
}

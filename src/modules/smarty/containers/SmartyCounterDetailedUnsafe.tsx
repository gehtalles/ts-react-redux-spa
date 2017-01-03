import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import UnsafeCounter, { ConnectedDispatch } from '../components/UnsafeCounter';
import * as actions from '../actions/';
import { SmartyModel } from '../types';
import withUnsafeRemoteData from '../../../lib/resources/containers/withUnsafeRemoteData';
import { ResourceId } from '../../../lib/resources/types/index';

export function mapDispatchToProps(dispatch: Dispatch<actions.SmartyAction>): ConnectedDispatch {
    return {
        onIncrement: (id: ResourceId) => dispatch(actions.increment(id)),
        onDecrement: (id: ResourceId) => dispatch(actions.decrement(id)),
    };
}

const ConnectedUnsafeCounter = connect(null, mapDispatchToProps)(UnsafeCounter);

export default function SmartyCounterDetailedUnsafe({ id }: { id: ResourceId }) {
    const Container = withUnsafeRemoteData<SmartyModel>(
        { endpoint: 'smarties', id: '1' },
        ConnectedUnsafeCounter,
    );

    return <Container />;
}

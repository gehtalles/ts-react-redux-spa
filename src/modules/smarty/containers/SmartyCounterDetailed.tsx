import * as React from 'react';

import SmartyCounter from './ConnectedSmartyCounter';
import { SmartyModel } from '../types';
import withRemoteData from '../../../lib/resources/containers/withRemoteData';
import { ResourceId } from '../../../lib/resources/types/index';

export default function SmartyCounterDetailed({ id }: { id: ResourceId }) {
    const Container = withRemoteData<SmartyModel>(
        { endpoint: 'smarties', id },
        {
            notAsked: () => <div>NotAsked</div>,
            loading: () => <div>Loading...</div>,
            refreshing: (previousData) => <SmartyCounter {...previousData} />,
            failure: (error) => <div>{`Could not load data: ${error}`}</div>,
            success: (data) => <SmartyCounter {...data} />,
        },
    );

    return <Container />;
}

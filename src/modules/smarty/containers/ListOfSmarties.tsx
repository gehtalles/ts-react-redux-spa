import * as React from 'react';

import ConnectedSmartyCounter from './ConnectedSmartyCounter';
import { SmartyModel } from '../types';
import withRemoteData from '../../../lib/resources/containers/withRemoteData';
import asList from '../../../lib/lists/containers/asList';

const ListOfSmarties = asList(ConnectedSmartyCounter);

export default withRemoteData<SmartyModel[]>(
    { endpoint: 'smarties' },
    {
        notAsked: () => <div>NotAsked</div>,
        loading: () => <div>Loading...</div>,
        refreshing: (previousData) => <ListOfSmarties items={previousData} />,
        failure: (error) => <div>{`Could not load data: ${error}`}</div>,
        success: (data) => <ListOfSmarties items={data} />,
    },
);

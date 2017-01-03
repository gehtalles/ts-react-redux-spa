import { RouteComponentProps } from 'react-router-dom';

import { ResourceId } from '../types/index';

// NOTE-jt-170619 these are not real parsers
// react-router alread did the heavy lifting

export function id({ match }: RouteComponentProps<{ id: string }>): ResourceId {
    return match.params.id;
}

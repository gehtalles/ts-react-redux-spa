import * as constants from '../constants';
import { ResourceId } from '../../../lib/resources/types/index';

export interface IncrementCounter {
    type: constants.INCREMENT;
    payload: ResourceId;
}

export interface DecrementCounter {
    type: constants.DECREMENT;
    payload: ResourceId;
}

export type SmartyAction = IncrementCounter | DecrementCounter;

export function increment(id: ResourceId): IncrementCounter {
    return {
        type: constants.INCREMENT,
        payload: id,
    };
}

export function decrement(id: ResourceId): DecrementCounter {
    return {
        type: constants.DECREMENT,
        payload: id,
    };
}

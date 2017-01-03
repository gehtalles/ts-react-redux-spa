import { HelloState } from '../../modules/hello/types/index';
import { QueryResultMap } from '../../lib/resources/types/index';

export interface AppState {
    enthusiasm: HelloState;
    queryResults: QueryResultMap;
}

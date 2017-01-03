import { connect, Dispatch } from 'react-redux';

import SmartyCounter, { ConnectedDispatch } from '../components/SmartyCounter';
import * as actions from '../actions/';
import { SmartyModel } from '../types';

function mapDispatchToProps(dispatch: Dispatch<actions.SmartyAction>): ConnectedDispatch {
    return {
        onIncrement: (id: string) => dispatch(actions.increment(id)),
        onDecrement: (id: string) => dispatch(actions.decrement(id)),
    };
}

export default connect<void, ConnectedDispatch, SmartyModel>(null, mapDispatchToProps)(SmartyCounter);

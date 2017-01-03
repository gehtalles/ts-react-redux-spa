import * as React from 'react';
import { Link } from 'react-router-dom';

import './SmartyCounter.css';
import { SmartyModel } from '../types/index';
import { ResourceId } from '../../../lib/resources/types/index';

export interface OwnProps {
}

// TODO-jt-170605 better to just use model type instead of extending?
export interface ConnectedState extends SmartyModel {
}

export interface ConnectedDispatch {
    onIncrement: (id: ResourceId) => void;
    onDecrement: (id: ResourceId) => void;
}

export type SmartyCounterProps = ConnectedState & ConnectedDispatch & OwnProps;

function SmartyCounter({ id, amount, onIncrement, onDecrement, name }: SmartyCounterProps) {
    if (amount <= 0) {
        throw new Error('value must not be zero or less!');
    }

    return (
        <div className="counter">
            <div>
                <Link to={`/smarties/${id}`}>{name}</Link>
                {` = ${amount}`}
            </div>
            <div>
                <button onClick={() => onDecrement(id)}>-</button>
                <button onClick={() => onIncrement(id)}>+</button>
            </div>
        </div>
    );
}

export default SmartyCounter;

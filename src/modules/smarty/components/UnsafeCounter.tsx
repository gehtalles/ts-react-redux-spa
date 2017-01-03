import * as React from 'react';
import './SmartyCounter.css';
import { SmartyModel } from '../types/index';
import { ResourceId } from '../../../lib/resources/types/index';
import { UnsafeRemoteDataProps } from '../../../lib/resources/containers/withUnsafeRemoteData';

export interface OwnProps {
}

export interface ConnectedState extends UnsafeRemoteDataProps<string, SmartyModel> {
}

export interface ConnectedDispatch {
    onIncrement: (id: ResourceId) => void;
    onDecrement: (id: ResourceId) => void;
}

export type CounterProps = ConnectedState & ConnectedDispatch & OwnProps;

function UnsafeCounter({ remoteData, onIncrement, onDecrement }: CounterProps) {
    if (remoteData.loading) {
        return <div>loading...</div>;
    }
    if (remoteData.error !== undefined) {
        return <div>{`Error: ${remoteData.error}`}</div>;
    }
    if (remoteData.data !== undefined) {
        // NOTE-jt-170606 either next line or disable strict null checks
        const data = remoteData.data;
        return (
            <div className="counter">
                <div className="value">
                    {`${data.name} = ${data.amount}`}
                </div>
                <div>
                    <button onClick={() => onDecrement(data.id)}>-</button>
                    <button onClick={() => onIncrement(data.id)}>+</button>
                </div>
            </div>
        );
    } else {
        return <div>Not Asked</div>;
    }
}

export default UnsafeCounter;

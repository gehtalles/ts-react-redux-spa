import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

export interface NotifyDispatch {
    onWillMountAction: () => void;
}

export default function notifyOnWillMount<P>(
    InnerComponent: React.ComponentClass<P> | React.StatelessComponent<P>,
    actionCreator: Function,
): React.ComponentClass<P> {

    function mapDispatchToProps(dispatch: Dispatch<Function>): NotifyDispatch {
        return {
            onWillMountAction: () => dispatch(actionCreator()),
        };
    }

    class NotifyStoreOnWillMount extends React.Component<NotifyDispatch & P, {}> {
        componentWillMount() {
            this.props.onWillMountAction();
        }

        render() {
            return <InnerComponent {...this.props} />;
        }
    }
    return connect<void, NotifyDispatch, P>(null, mapDispatchToProps)(NotifyStoreOnWillMount);
}

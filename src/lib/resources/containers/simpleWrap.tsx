import * as React from 'react';

// NOTE-jt-170530 example implementation of HOC in typescript
export default function simpleComponentWrap<P>(
    Comp: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.ComponentClass<P> {
    return class WrappedComponent extends React.Component<P, void> {
        render() {
            return <Comp {...this.props} />;
        }
    };
}

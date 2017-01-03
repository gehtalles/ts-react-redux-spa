import * as React from 'react';

function asList<P>(ItemComponent: React.ComponentClass<P> | React.StatelessComponent<P>) {
    return function List({ items }: { items: P[] }) {
        return (
            <ol>
                {items.map((item, idx) =>
                    <li key={idx}>
                        <ItemComponent {...item} />
                    </li>)
                }
            </ol>
        );
    };
}

export default asList;

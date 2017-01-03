import * as React from 'react';
import { Link } from 'react-router-dom';

import './Navigation.css';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <Link to="/">Home</Link>
                <Link to="/smarties">Smarties</Link>
            </ul>
        </nav>
    );
}

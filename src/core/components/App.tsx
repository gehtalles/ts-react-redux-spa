// TODO-jt-170619 find a way to get rid of the any
// tslint:disable no-any
import * as React from 'react';
import * as R from 'ramda';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';

import './App.css';
import Showcases from './Showcases';
import Navigation from './Navigation';
import SmartyCounterDetailed from '../../modules/smarty/containers/SmartyCounterDetailed';
import ListOfSmarties from '../../modules/smarty/containers/ListOfSmarties';
import * as P from '../../lib/resources/utils/parsers';

function SmartiesTrap({ match }: RouteComponentProps<any>) {
    return (
        <div>
            <div>All Things Smarty!</div>
            <Switch>
                <Route
                    path={match.url + '/:id'}
                    render={R.pipe(P.id, R.objOf('id'), SmartyCounterDetailed)}
                />
                <Route
                    render={() => <ListOfSmarties />}
                />
            </Switch>
        </div>
    );
}

function App() {
    return (
        <div className="App">
            <div className="App-header">
                <h1>Oh hai! Yes, this is boilerplate.</h1>
            </div>
            <Navigation />
            <Switch>
                <Route exact={true} path="/" component={Showcases} />
                <Route path="/smarties" component={SmartiesTrap} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default App;

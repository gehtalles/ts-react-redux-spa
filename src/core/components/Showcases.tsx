// TODO-jt-170622 find a way to get rid of the any
// tslint:disable no-any
import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import './Showcases.css';
import Hello from '../../modules/hello/containers/Hello';
import ListOfSmarties from '../../modules/smarty/containers/ListOfSmarties';
import UnsafeSmartyCounter from '../../modules/smarty/containers/SmartyCounterDetailedUnsafe';

export default function Showcases({ match }: RouteComponentProps<any>) {
    return (
        <div>
            <Hello name="Boilerplate" />
            <br />
            <div className="showcases">
                <div>
                    <span>RemoteData (unsafe)</span>
                    <UnsafeSmartyCounter id={match.params.id} />
                </div>
                <div>
                    <span>RemoteData</span>
                    <ListOfSmarties />
                </div>
            </div>
        </div>
    );
}

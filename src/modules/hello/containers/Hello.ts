import Hello, { OwnProps } from '../components/Hello';
import * as actions from '../actions/';
import { HelloState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps(
    { enthusiasm: { enthusiasmLevel, languageName } }: { enthusiasm: HelloState }, ownProps: OwnProps,
) {
    return {
        enthusiasmLevel: enthusiasmLevel,
        name: ownProps.name,
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);

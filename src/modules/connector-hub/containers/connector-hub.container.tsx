import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TAction } from '../../../redux/actions';
import { fetchKeyAC } from '../../../redux/actions/connector-hub';
import { TAppState } from '../../../redux/store';
import { ConnectorHub } from '../components/connector-hub/connector-hub';

const mapStateToProps = (state: TAppState) => ({
  connectors: state.connectors,
});

const mapDispatchToProps = (dispatch: Dispatch<TAction>) => ({
  fetchConnectors: bindActionCreators(fetchKeyAC, dispatch),
});

export const ConntectorHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectorHub);

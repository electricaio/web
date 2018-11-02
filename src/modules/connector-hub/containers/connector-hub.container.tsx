import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ConnectorHub } from '../components/connector-hub/connector-hub';
import { ApplicationState } from '../../../redux/store';
import { fetchConnectors } from '../../../redux/connector-hub/actions';

const mapStateToProps = ({ connectors }: ApplicationState) => ({
  connectors: connectors.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnectors: bindActionCreators(fetchConnectors, dispatch),
});

export const ConntectorHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectorHub);

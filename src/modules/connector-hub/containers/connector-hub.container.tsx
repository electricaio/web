import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ConnectorHubComponent } from '../components/connector-hub/connector-hub';
import { ApplicationState } from '../../../redux/store';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { fetchConnectors } from '../../../redux/connector-hub/async';
import { AsyncComponent } from '../../../components/async-component/async-component';

const mapStateToProps = ({ connectors }: ApplicationState) => ({
  connectors: connectors.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnectors: bindActionCreators(fetchConnectors, dispatch),
});

interface PropsFromState {
  connectors: ConnectorModal[];
}

interface PropsFromDispatch {
  fetchConnectors: typeof fetchConnectors;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ConnectorHub extends Component<AllProps> {
  render() {
    const { connectors, fetchConnectors } = this.props;
    return (
      <AsyncComponent getAsyncActions={() => [fetchConnectors()]} message="Fetching Connectors">
        <ConnectorHubComponent connectors={connectors} />
      </AsyncComponent>
    );
  }
}

export const ConntectorHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectorHub);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { APIHubComponent } from '../components/api-hub/api-hub';
import { ApplicationState } from '../../../redux/store';
import { ConnectorModal } from '../../../redux/api-hub/types';
import { fetchConnectors } from '../../../redux/api-hub/async';
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

export class APIHub extends Component<AllProps> {
  render() {
    const { connectors, fetchConnectors } = this.props;
    return (
      <AsyncComponent getAsyncActions={() => [fetchConnectors()]} message="Fetching APIs">
        <APIHubComponent connectors={connectors} />
      </AsyncComponent>
    );
  }
}

export const APIHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(APIHub);

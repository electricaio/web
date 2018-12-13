import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ConnectorHubComponent } from '../components/connector-hub/connector-hub';
import { ApplicationState } from '../../../redux/store';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { fetchConnectors } from '../../../redux/connector-hub/async';

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
  componentDidMount = () => {
    this.props.fetchConnectors();
  };

  public render() {
    const { connectors } = this.props;
    return <ConnectorHubComponent connectors={connectors} />;
  }
}

export const ConntectorHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectorHub);

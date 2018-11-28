import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ConnectorHubComponent } from '../components/connector-hub/connector-hub';
import { ApplicationState } from '../../../redux/store';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { Spin } from 'antd';
import { fetchConnectors } from '../../../redux/connector-hub/async';

const mapStateToProps = ({ connectors }: ApplicationState) => ({
  connectors: connectors.data,
  loading: connectors.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnectors: bindActionCreators(fetchConnectors, dispatch),
});

interface PropsFromState {
  connectors: ConnectorModal[];
  loading: boolean;
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
    const { connectors, loading } = this.props;
    return (
      <Spin spinning={loading}>
        <ConnectorHubComponent connectors={connectors} />
      </Spin>
    );
  }
}

export const ConntectorHubContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectorHub);

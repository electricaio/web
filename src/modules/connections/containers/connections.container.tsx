import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { fetchConnections } from '../../../redux/connections/actions';
import { Spin } from 'antd';
import { ConnectionsComponent } from '../components/connections';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { RouteComponentProps } from 'react-router';
import { getKey } from '../../../redux/api-keys/async';

const mapStateToProps = ({ connections, apiKeys, connectors }: ApplicationState) => ({
  connections: connections.data,
  accessKeys: apiKeys.data,
  loading: connections.loading,
  connectors: connectors.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnectionsAction: bindActionCreators(fetchConnections, dispatch),
  getKeyAction: bindActionCreators(getKey, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  accessKeys: ApiKeyModal[];
  connectors: ConnectorModal[];
  loading: boolean;
}

interface PropsFromDispatch {
  fetchConnectionsAction: typeof fetchConnections;
  getKeyAction: typeof getKey;
}

interface MatchParams {
  connectorId: string;
}

interface RouterProps extends Partial<RouteComponentProps<MatchParams>> {}

type AllProps = PropsFromState & PropsFromDispatch & RouterProps;

export class Connections extends Component<AllProps> {
  componentDidMount = () => {
    /*
      const { fetchConnectionsAction, getKeyAction, fetchConnector  } = this.props;
      We need to call these three calls. We can just call them all here for this now
      */
  };

  public render() {
    const { loading, connectors, connections, accessKeys, match } = this.props;
    const connector = connectors.find(con => con.id === parseInt(match.params.connectorId, 10));
    const breadcrumbNameMap = {
      '/connector-hub': 'Connector Hub',
      [`/connector-hub/${match.params.connectorId}`]: connector.name,
    };
    return (
      <Fragment>
        <BreadcrumbComponent breadcrumbNameMap={breadcrumbNameMap} />
        <Spin spinning={loading}>
          <ConnectionsComponent
            connector={connector}
            accessKeys={accessKeys}
            connections={connections}
          />
        </Spin>
      </Fragment>
    );
  }
}

export const ConnectionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Connections);

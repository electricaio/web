import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { Spin } from 'antd';
import { ConnectionsComponent } from '../components/connections';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { RouteComponentProps } from 'react-router';
import { fetchKeys } from '../../../redux/api-keys/async';
import { fetchConnections, createConnection } from '../../../redux/connections/async';
import { UserDto } from '../../../redux/auth/types';

const mapStateToProps = ({ connections, apiKeys, connectors, auth }: ApplicationState) => ({
  connections: connections.data,
  accessKeys: apiKeys.data,
  loading: connections.loading,
  connectors: connectors.data,
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnections: bindActionCreators(fetchConnections, dispatch),
  createConnection: bindActionCreators(createConnection, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  accessKeys: ApiKeyModal[];
  connectors: ConnectorModal[];
  user: UserDto;
  loading: boolean;
}

interface PropsFromDispatch {
  fetchConnections: typeof fetchConnections;
  fetchKeys: typeof fetchKeys;
  createConnection: typeof createConnection;
}

interface MatchParams {
  connectorId: string;
}

interface RouterProps extends Partial<RouteComponentProps<MatchParams>> {}

type AllProps = PropsFromState & PropsFromDispatch & RouterProps;

export class Connections extends Component<AllProps> {
  componentDidMount = () => {
    const { fetchKeys, user } = this.props;
    //  const connectorId = parseInt(match.params.connectorId, 10);
    fetchKeys(user.id);
    //  fetchConnector(connectorId);
    //  fetchConnections(connectorId);
  };

  public render() {
    const { loading, connectors, connections, accessKeys, match, createConnection } = this.props;
    const connector = connectors.find(
      connector => connector.id === parseInt(match.params.connectorId, 10)
    );
    const breadcrumbNameMap = {
      '/connector-hub': 'Connector Hub',
      [`/connector-hub/${match.params.connectorId}`]: connector.name,
    };
    return (
      <Fragment>
        <BreadcrumbComponent breadcrumbNameMap={breadcrumbNameMap} />
        <Spin spinning={loading}>
          <ConnectionsComponent
            createConnection={createConnection}
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

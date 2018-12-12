import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { ConnectionsComponent } from '../components/connections';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { RouteComponentProps } from 'react-router';
import { fetchKeys } from '../../../redux/api-keys/async';
import { fetchConnections, createConnection } from '../../../redux/connections/async';
import { UserDto } from '../../../redux/auth/types';
import { fetchConnector } from '../../../redux/connector-hub/async';
import { AsyncComponent } from '../../../components/async-component/async-component';

const mapStateToProps = ({ connections, apiKeys, connectors, auth }: ApplicationState) => ({
  connections: connections.data,
  accessKeys: apiKeys.data,
  connectors: connectors.data,
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnections: bindActionCreators(fetchConnections, dispatch),
  createConnection: bindActionCreators(createConnection, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  fetchConnector: bindActionCreators(fetchConnector, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  accessKeys: ApiKeyModal[];
  connectors: ConnectorModal[];
  user: UserDto;
}

export interface PropsFromDispatch {
  fetchKeys: typeof fetchKeys;
  fetchConnections: typeof fetchConnections;
  fetchConnector: typeof fetchConnector;
  createConnection: typeof createConnection;
}

interface MatchParams {
  connectorId: string;
}
interface StateType {
  loading: boolean;
  error: boolean;
}

interface RouterProps extends Partial<RouteComponentProps<MatchParams>> {}

type AllProps = PropsFromState & PropsFromDispatch & RouterProps;

export class Connections extends Component<AllProps, StateType> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
      loading: true,
      error: false,
    };
  }

  render() {
    const {
      accessKeys,
      connections,
      connectors,
      fetchKeys,
      fetchConnections,
      fetchConnector,
      createConnection,
      user,
      match,
    } = this.props;
    const connectorId = parseInt(match.params.connectorId, 10);
    const connector = connectors.find(connector => connector.id === connectorId);
    const asyncActions = () => [
      fetchKeys(user.id),
      fetchConnections(user.id, connectorId),
      fetchConnector(connectorId),
    ];
    const breadcrumbNameMap = {
      '/connector-hub': 'Connector Hub',
      [`/connector-hub/${match.params.connectorId}`]: connector && connector.name,
    };

    return (
      <AsyncComponent getAsyncActions={asyncActions}>
        <Fragment>
          <BreadcrumbComponent breadcrumbNameMap={breadcrumbNameMap} />

          <ConnectionsComponent
            createConnection={createConnection}
            connector={connector}
            accessKeys={accessKeys}
            connections={connections}
          />
        </Fragment>
      </AsyncComponent>
    );
  }
}

export const ConnectionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Connections);

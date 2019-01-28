import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { ConnectionsComponent } from '../components/connections';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { ConnectionModal, AuthorizationType } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { ConnectorModal } from '../../../redux/api-hub/types';
import { RouteComponentProps } from 'react-router';
import { fetchKeys } from '../../../redux/api-keys/async';
import {
  fetchConnections,
  createConnection,
  deleteConnection,
  updateConnection,
  updateAuthorization,
} from '../../../redux/connections/async';
import { UserDto } from '../../../redux/auth/types';
import { fetchConnector } from '../../../redux/api-hub/async';
import { AsyncComponent } from '../../../components/async-component/async-component';

const mapStateToProps = ({ connections, apiKeys, connectors, auth }: ApplicationState) => ({
  connections: connections.data,
  authorizations: connections.authorizations,
  accessKeys: apiKeys.data,
  connectors: connectors.data,
  user: auth.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnections: bindActionCreators(fetchConnections, dispatch),
  createConnection: bindActionCreators(createConnection, dispatch),
  updateConnection: bindActionCreators(updateConnection, dispatch),
  updateAuthorization: bindActionCreators(updateAuthorization, dispatch),
  deleteConnection: bindActionCreators(deleteConnection, dispatch),
  fetchKeys: bindActionCreators(fetchKeys, dispatch),
  fetchConnector: bindActionCreators(fetchConnector, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  authorizations: AuthorizationType[];
  accessKeys: ApiKeyModal[];
  connectors: ConnectorModal[];
  user: UserDto;
}

export interface PropsFromDispatch {
  fetchKeys: typeof fetchKeys;
  fetchConnections: typeof fetchConnections;
  fetchConnector: typeof fetchConnector;
  createConnection: typeof createConnection;
  deleteConnection: typeof deleteConnection;
  updateConnection: typeof updateConnection;
  updateAuthorization: typeof updateAuthorization;
}

interface MatchParams {
  connectorId: string;
}
interface StateType {
  error: boolean;
}

interface RouterProps extends Partial<RouteComponentProps<MatchParams>> {}

type AllProps = PropsFromState & PropsFromDispatch & RouterProps;

export class Connections extends Component<AllProps, StateType> {
  constructor(props: AllProps) {
    super(props);
    this.state = {
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
      updateConnection,
      deleteConnection,
      updateAuthorization,
      user,
      authorizations,
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
      '/api-hub': 'API Hub',
      [`/api-hub/${match.params.connectorId}`]: `${connector && connector.name} Connections`,
    };

    return (
      <AsyncComponent getAsyncActions={asyncActions} message="Fetching your connections">
        <Fragment>
          <BreadcrumbComponent breadcrumbNameMap={breadcrumbNameMap} />

          <ConnectionsComponent
            deleteConnection={deleteConnection}
            createConnection={createConnection}
            updateConnection={updateConnection}
            updateAuthorization={updateAuthorization}
            connector={connector}
            accessKeys={accessKeys}
            connections={connections}
            authorizations={authorizations}
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

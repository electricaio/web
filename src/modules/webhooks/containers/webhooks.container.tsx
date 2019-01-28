import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../redux/store';
import { ConnectionModal } from '../../../redux/connections/types';
import { RouteComponentProps } from 'react-router';

import { AsyncComponent } from '../../../components/async-component/async-component';
import { createWebhook, deleteWebhook, fetchWebhooks } from '../../../redux/webhooks/async';
import { WebhookComponent } from '../components/webhooks';
import { fetchConnection } from '../../../redux/connections/async';
import { WebhookModal } from '../../../redux/webhooks/types';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb';
import { fetchConnector } from '../../../redux/api-hub/async';
import { ConnectorModal } from '../../../redux/api-hub/types';

const mapStateToProps = ({ connections, webhooks, connectors }: ApplicationState) => ({
  webhooks: webhooks.data,
  connections: connections.data,
  connectors: connectors.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnection: bindActionCreators(fetchConnection, dispatch),
  createWebhook: bindActionCreators(createWebhook, dispatch),
  deleteWebhook: bindActionCreators(deleteWebhook, dispatch),
  fetchWebhooks: bindActionCreators(fetchWebhooks, dispatch),
  fetchConnector: bindActionCreators(fetchConnector, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  connectors: ConnectorModal[];
  webhooks: WebhookModal[];
}

export interface PropsFromDispatch {
  fetchConnection: typeof fetchConnection;
  fetchConnector: typeof fetchConnector;
  createWebhook: typeof createWebhook;
  deleteWebhook: typeof deleteWebhook;
  fetchWebhooks: typeof deleteWebhook;
}

interface MatchParams {
  connectionId: string;
  connectorId: string;
}

interface RouterProps extends Partial<RouteComponentProps<MatchParams>> {}

type AllProps = PropsFromState & PropsFromDispatch & RouterProps;

export class Webhooks extends Component<AllProps> {
  render() {
    const {
      connections,
      connectors,
      webhooks,
      fetchConnection,
      fetchConnector,
      deleteWebhook,
      createWebhook,
      fetchWebhooks,
      match,
    } = this.props;
    const connectionId = parseInt(match.params.connectionId, 10);
    const connectorId = parseInt(match.params.connectorId, 10);

    const asyncActions = () => [
      fetchConnector(connectorId),
      fetchWebhooks(connectionId),
      fetchConnection(connectionId),
    ];

    const connection = connections.find(connection => connection.id === connectionId);
    const connector = connectors.find(connector => connector.id === connectorId);
    const breadcrumbNameMap = {
      '/api-hub': 'API Hub',
      [`/api-hub/${match.params.connectorId}`]: connector && connector.name,
      [`/api-hub/${match.params.connectorId}/connections`]: `${connection &&
        connection.name} Connections`,
    };

    return (
      <AsyncComponent getAsyncActions={asyncActions} message="Fetching your webhooks">
        <Fragment>
          <BreadcrumbComponent breadcrumbNameMap={breadcrumbNameMap} />

          <WebhookComponent
            webhooks={webhooks}
            connection={connection}
            deleteWebhook={deleteWebhook}
            createWebhook={createWebhook}
          />
        </Fragment>
      </AsyncComponent>
    );
  }
}

export const WebhooksContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Webhooks);

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

const mapStateToProps = ({ connections, webhooks }: ApplicationState) => ({
  webhooks: webhooks.data,
  connections: connections.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchConnection: bindActionCreators(fetchConnection, dispatch),
  createWebhook: bindActionCreators(createWebhook, dispatch),
  deleteWebhook: bindActionCreators(deleteWebhook, dispatch),
  fetchWebhooks: bindActionCreators(fetchWebhooks, dispatch),
});

interface PropsFromState {
  connections: ConnectionModal[];
  webhooks: WebhookModal[];
}

export interface PropsFromDispatch {
  fetchConnection: typeof fetchConnection;
  createWebhook: typeof createWebhook;
  deleteWebhook: typeof deleteWebhook;
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
      webhooks,
      fetchConnection,
      deleteWebhook,
      createWebhook,
      match,
    } = this.props;
    const connectionId = parseInt(match.params.connectionId, 10);
    const connection = connections.find(connection => connection.id === connectionId);
    const asyncActions = () => [fetchWebhooks(connectionId), fetchConnection(connectionId)];

    const breadcrumbNameMap = {
      '/connector-hub': 'Connector Hub',
      [`/connector-hub/${match.params.connectorId}`]: connection && connection.name,
      [`/connector-hub/${match.params.connectionId}/connections/`]: connection && connection.name,
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

import React, { Fragment, Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Header } from '../../ui-kit/header';
import { ConnectionsTable } from './table/table';
import { ConnectionModal, AuthorizationType } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { Tooltip } from 'antd';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { ButtonActionModal } from '../../ui-kit/modal-button-action/modal-button-action';
import { ConnectionForm } from './connection-form/connection-form';
import {
  createConnection,
  deleteConnection,
  updateConnection,
  updateAuthorization,
} from '../../../redux/connections/async';
import { StyledButton } from '../../ui-kit/button';
import { Properties } from '../../../components/properties-form/properties-form';
import { NO_AUTH } from './connection-form/authorizations/auth_types';
import { getAuthPayload } from './connection-form/authorizations/payload-builder';

interface PropsFromState {
  connections: ConnectionModal[];
  authorizations: AuthorizationType[];
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
  createConnection: typeof createConnection;
  updateConnection: typeof updateConnection;
  updateAuthorization: typeof updateAuthorization;
  deleteConnection: typeof deleteConnection;
}

export class ConnectionsComponent extends Component<PropsFromState> {
  handleDelete = (connectionId: number) => {
    const { deleteConnection } = this.props;
    deleteConnection(connectionId);
  };

  buildConnection = (formValues: any): ConnectionModal => {
    const { connector } = this.props;

    const properties = formValues.properties.reduce(
      (result: any, item: Properties) => ({ ...result, [item.name]: item.value }),
      {}
    );
    return {
      properties,
      connectorId: connector.id,
      name: formValues.connectionName,
      ...(formValues.accessKeyId && { accessKeyId: formValues.accessKeyId }),
    };
  };

  handleCommit = (formValues: any) => {
    const { connector, createConnection } = this.props;
    createConnection(
      this.buildConnection(formValues),
      connector,
      getAuthPayload(connector.authorizationType, formValues)
    );
  };

  handleEdit = async (id: number, formValues: any) => {
    const {
      updateConnection,
      updateAuthorization,
      connections,
      connector,
      authorizations,
    } = this.props;
    const connection = connections.find((c: ConnectionModal) => c.id === id);

    const authorization = authorizations.find(
      (auth: AuthorizationType) => auth.id === connection.authorizationId
    );
    await updateConnection(connection.id, {
      ...connection,
      ...this.buildConnection(formValues),
    });
    if (connector.authorizationType.toLowerCase() !== NO_AUTH) {
      await updateAuthorization(connection.authorizationId, connector.authorizationType, {
        ...authorization,
        ...getAuthPayload(connector.authorizationType, formValues),
      });
    }
  };

  render() {
    const { connector, accessKeys, connections } = this.props;
    const noAccessKeysTooltip = isEmpty(accessKeys)
      ? 'You need at least one Access Key before creating a connection'
      : null;
    return (
      <Fragment>
        <Header>
          {connector.name} uses {connector.authorizationType} Authorization
        </Header>
        <ConnectionsTable
          onEdit={this.handleEdit}
          onRemove={this.handleDelete}
          accessKeys={accessKeys}
          connections={connections}
          connector={connector}
        />
        <ButtonActionModal
          title="Add a new Connection"
          submitText="Create"
          onCommit={this.handleCommit}
          formComponent={<ConnectionForm accessKeys={accessKeys} connector={connector} />}
        >
          <Tooltip placement="top" title={noAccessKeysTooltip}>
            <StyledButton type="primary" size="large" disabled={isEmpty(accessKeys)}>
              Add Connection
            </StyledButton>
          </Tooltip>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

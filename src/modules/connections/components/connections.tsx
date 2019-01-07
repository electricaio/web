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
      accessKeyId: formValues.accessKeyId,
    };
  };

  handleCommit = (formValues: any) => {
    const { connector, createConnection } = this.props;
    createConnection(
      this.buildConnection(formValues),
      connector,
      this.getAuthType(connector.authorizationType, formValues)
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

    await updateConnection(id, { ...connection, ...this.buildConnection(formValues) });
    await updateAuthorization(id, connector.authorizationType, {
      ...authorization,
      ...this.getAuthType(connector.authorizationType, formValues),
    });
  };

  getAuthType = (authorizationType: string, formValues: any): any => {
    switch (authorizationType.toLowerCase()) {
      case 'basic':
        return {
          password: formValues.password,
          username: formValues.username,
        };
      case 'token':
        return {
          token: formValues.token,
        };
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
            <StyledButton withTopMargin type="primary" size="large" disabled={isEmpty(accessKeys)}>
              Add Connection
            </StyledButton>
          </Tooltip>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

import React, { Fragment, Component } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Header } from '../../ui-kit/header';
import { ConnectionsTable } from './table/table';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { Tooltip } from 'antd';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { ButtonActionModal } from '../../ui-kit/modal-button-action/modal-button-action';
import { ConnectionForm } from './connection-form/connection-form';
import { createConnection } from '../../../redux/connections/async';
import { StyledButton } from '../../ui-kit/button';

interface PropsFromState {
  connections: ConnectionModal[];
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
  createConnection: typeof createConnection;
}

export class ConnectionsComponent extends Component<PropsFromState> {
  handleCommit = (formValues: any) => {
    const { connector, createConnection } = this.props;
    const connection: ConnectionModal = {
      connectorId: connector.id,
      name: formValues.connectionName,
      accessKeyId: formValues.accessKeyId,
    };
    createConnection(
      connection,
      connector,
      this.getAuthType(connector.authorizationType, formValues)
    );
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
        <ConnectionsTable onRemove={() => {}} accessKeys={accessKeys} connections={connections} />
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

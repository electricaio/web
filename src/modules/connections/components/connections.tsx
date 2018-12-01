import React, { Fragment, Component } from 'react';
import { Header } from '../../ui-kit/header';
import { ConnectionsTable } from './table/table';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { Button } from 'antd';
import { ConnectorModal } from '../../../redux/connector-hub/types';
import { ButtonActionModal } from './modal-button-action/modal-button-action';

interface PropsFromState {
  connections: ConnectionModal[];
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
}

export class ConnectionsComponent extends Component<PropsFromState> {
  handleCommit = (connection: ConnectionModal) => {
  };
  render() {
    const { connector, accessKeys, connections } = this.props;

    return (
      <Fragment>
        <Header>
          {connector.name} uses Token Authorization. To learn more about how to obtain{' '}
          {connector.name} tokens
        </Header>
        <ConnectionsTable
          onRemove={() => {}}
          accessKeys={accessKeys}
          connections={connections}
        />
        <ButtonActionModal
          title="Add Connection"
          submitText="Create"
          accessKeys={accessKeys}
          accessKeyId={1}
          connectorId={connector.id}
          authorizationType={connector.authorizationType}
          onCommit={this.handleCommit}
        >
          <Button type="primary" size="large">
            Add Connection
          </Button>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

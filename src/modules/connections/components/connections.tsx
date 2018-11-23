import React, { Fragment, Component } from 'react';
import { Header } from '../../ui-kit/header';
import { ConnectionsTable } from './table/table';
import { ConnectionModal } from '../../../redux/connections/types';
import { ApiKeyModal } from '../../../redux/api-keys/types';
import { Button } from 'antd';
import { ConnectorModal } from '../../../redux/connector-hub/types';

interface PropsFromState {
  connections: ConnectionModal[];
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
}

export class ConnectionsComponent extends Component<PropsFromState> {
  render() {
    const { connector } = this.props;
    return (
      <Fragment>
        <Header>
          {connector.name} uses Token Authorization. To learn more about how to obtain{' '}
          {connector.name} tokens
        </Header>
        <ConnectionsTable
          onRemove={() => {}}
          accessKeys={this.props.accessKeys}
          connections={this.props.connections}
        />
        <Button type="primary" size="large">
          Add Connection
        </Button>
      </Fragment>
    );
  }
}

import React, { Component } from 'react';
import get from 'lodash/get';
import { Table, Select, Icon } from 'antd';
import { FilterDropdown, AccessKeyName } from './table.css';
import { ColumnProps } from 'antd/lib/table';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ActionButtons } from '../../../../components/action-buttons/action-buttons';

const Option = Select.Option;

export type TableProps = {
  connections: ConnectionModal[];
  accessKeys: ApiKeyModal[];
  onRemove: (id: number) => void;
};

export class ConnectionsTable extends Component<TableProps> {
  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  };

  handleEdit = (id: number) => () => {};

  getColumns(): ColumnProps<ConnectionModal>[] {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Access Key',
        key: 'accessKeyId',
        width: '35%',
        filterDropdown: () => (
          <FilterDropdown>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select an Access key"
              optionFilterProp="children"
            >
              <Option value="prod">Production</Option>
              <Option value="dev">Development</Option>
              <Option value="test">Testing</Option>
            </Select>
          </FilterDropdown>
        ),
        render: (entity: ConnectionModal) => {
          const accessKey = this.props.accessKeys.find(
            (accessKey: ApiKeyModal) => accessKey.id === entity.accessKeyId
          );
          return <AccessKeyName>{get(accessKey, 'name', '')}</AccessKeyName>;
        },
      },
      {
        title: 'Token',
        key: 'token',
        render: (entity: ConnectionModal) => <span>{entity.token}</span>,
      },
      {
        title: 'Date Created',
        key: 'createdAt',
      },
      {
        title: 'Status',
        key: 'status',
        render: () => <Icon type="stop" />,
      },
      {
        title: 'Webhooks',
        key: 'webhooks',
        render: () => <span>Configure Webhook</span>,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: ConnectionModal) => (
          <ActionButtons
            name={entity.name}
            onRemove={this.handleRemove(entity.id)}
            onEdit={this.handleEdit(entity.id)}
          />
        ),
      },
    ];
  }

  render() {
    const { connections } = this.props;
    const columns = this.getColumns();
    return <Table<ConnectionModal> pagination={false} columns={columns} dataSource={connections} />;
  }
}

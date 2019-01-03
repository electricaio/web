import React, { Component } from 'react';
import { Table, Select } from 'antd';
import { FilterDropdown, AccessKeyName } from './table.css';
import { ColumnProps } from 'antd/lib/table';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ActionButtons } from '../../../../components/action-buttons/action-buttons';
import { SelectValue } from 'antd/lib/select';
import { DateComponent } from '../../../ui-kit/date';
import { Link } from 'react-router-dom';
import { ConnectionForm, DefaultFormValues } from '../connection-form/connection-form';
import { ConnectorModal } from '../../../../redux/connector-hub/types';

const Option = Select.Option;

export type TableProps = {
  connections: ConnectionModal[];
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
  onRemove: (id: number) => void;
};

export class ConnectionsTable extends Component<TableProps> {
  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  };

  getAccessKey = (entity: ConnectionModal): ApiKeyModal => {
    return this.props.accessKeys.find(
      (accessKey: ApiKeyModal) => accessKey.id === entity.accessKeyId
    );
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
        onFilter: (value, record: ConnectionModal) => {
          return this.getAccessKey(record)
            .name.toLowerCase()
            .includes(value.toLowerCase());
        },
        filterDropdown: ({ setSelectedKeys, confirm }: any) => {
          return (
            <FilterDropdown>
              <Select
                onChange={(e: SelectValue) => {
                  setSelectedKeys(e ? [e] : []);
                  confirm();
                }}
                showSearch
                style={{ width: 200 }}
                placeholder="Filter by Access key"
                optionFilterProp="children"
              >
                {this.props.accessKeys.map((accessKey: ApiKeyModal) => (
                  <Option key={accessKey.id.toString()} value={accessKey.name}>
                    {accessKey.name}
                  </Option>
                ))}
              </Select>
            </FilterDropdown>
          );
        },
        render: (entity: ConnectionModal) => {
          const accessKey = this.getAccessKey(entity);
          return <AccessKeyName>{accessKey ? accessKey.name : 'N/A'}</AccessKeyName>;
        },
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: ConnectionModal) => <DateComponent date={entity.createdAt} />,
      },
      {
        title: 'Webhooks',
        key: 'webhooks',
        render: (entity: ConnectionModal) => {
          const webhookLink = `/connector-hub/${entity.connectorId}/connections/${entity.id}`;
          return <Link to={webhookLink}>Configure Webhook</Link>;
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: ConnectionModal) => {
          const properties = Object.keys(entity.properties || {}).map(name => ({
            name,
            value: entity.properties[name],
          }));

          const defaultValues: DefaultFormValues = {
            properties,
            connectionName: entity.name,
            accessKeyId: entity.accessKeyId,
          };
          return (
            <ActionButtons
              onEdit={this.handleRemove(entity.id)}
              editForm={
                <ConnectionForm
                  accessKeys={this.props.accessKeys}
                  connector={this.props.connector}
                  defaultFormValues={defaultValues}
                />
              }
              typeName="Connection"
              name={entity.name}
              onRemove={this.handleRemove(entity.id)}
            />
          );
        },
      },
    ];
  }

  render() {
    const { connections } = this.props;
    const columns = this.getColumns();
    return (
      <Table<ConnectionModal>
        loading={false}
        pagination={false}
        columns={columns}
        dataSource={connections}
      />
    );
  }
}

import React, { Component } from 'react';
import { Table } from 'antd';
import { ActionButtons } from './action-buttons';
import { StyledEye } from './table.css';
import { HiddenAPIKeyModal } from '../modal-hidden-apikey/modal-hidden-api-key';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { DateComponent } from '../../../ui-kit/date';

export type TTableProps = {
  data: ApiKeyModal[];
  onRemove: (id: number) => void;
  onRefresh: (id: number) => void;
};

export class ApiKeysTable extends Component<TTableProps> {
  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  };

  handleRefresh = (id: number) => () => {
    this.props.onRefresh(id);
  };

  getColumns() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Key',
        key: 'key',
        render: (entity: ApiKeyModal) => (
          <HiddenAPIKeyModal key={entity.id} entity={entity}>
            <StyledEye type="eye" />
          </HiddenAPIKeyModal>
        ),
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: ApiKeyModal) => <DateComponent date={entity.createdAt} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: ApiKeyModal) => (
          <ActionButtons
            name={entity.name}
            onRemove={this.handleRemove(entity.id)}
            onRefresh={this.handleRefresh(entity.id)}
          />
        ),
      },
    ];
  }

  render() {
    const { data } = this.props;
    const columns = this.getColumns();
    const dataSource = data.map(obj => ({ ...obj, key: obj.name }));
    return <Table pagination={false} columns={columns} dataSource={dataSource} />;
  }
}

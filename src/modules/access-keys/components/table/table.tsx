import React, { Component } from 'react';
import { Table } from 'antd';
import { ActionButtons } from './action-buttons';
import { StyledEye } from './table.css';
import { HiddenAccessKeyModal } from '../modal-hidden-access-key/modal-hidden-access-key';
import { AccessKeyModal } from '../../../../redux/access-keys/types';
import { DateComponent } from '../../../ui-kit/date';

export type TTableProps = {
  data: AccessKeyModal[];
  onRemove: (id: number) => void;
  onRefresh: (id: number) => void;
};

export class AccessKeysTable extends Component<TTableProps> {
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
        render: (entity: AccessKeyModal) => (
          <HiddenAccessKeyModal key={entity.id} entity={entity}>
            <StyledEye type="eye" />
          </HiddenAccessKeyModal>
        ),
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: AccessKeyModal) => <DateComponent date={entity.createdAt} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: AccessKeyModal) => (
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

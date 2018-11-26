import React, { Component, SFC } from 'react';
import { Table } from 'antd';
import { ActionButtons } from './action-buttons';
import { format } from 'date-fns';
import { StyledEye } from './table.css';
import { HiddenAPIKeyModal } from '../modal-hidden-apikey/modal-hidden-apikey';
import { ApiKeyModal } from '../../../../redux/api-keys/types';

type TDateProps = {
  date: string;
};

export const Date: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;

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
          <HiddenAPIKeyModal id={entity.id}>
            <StyledEye type="eye" />
          </HiddenAPIKeyModal>
        ),
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: ApiKeyModal) => <Date date={entity.createdAt} />,
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

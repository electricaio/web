import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ActionButtons } from '../../../../components/action-buttons/action-buttons';
import { DateComponent } from '../../../ui-kit/date';
import { WebhookModal } from '../../../../redux/webhooks/types';
import { Copy } from './copy';

export type TableProps = {
  webhooks: WebhookModal[];
  onRemove: (id: number) => void;
};

export class WebhooksTable extends Component<TableProps> {
  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  };

  handleEdit = (id: number) => () => {};

  getColumns(): ColumnProps<WebhookModal>[] {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Url',
        key: 'url',
        render: (entity: WebhookModal) => (
          <Input size="large" addonAfter={<Copy url={entity.url} />} disabled value={entity.url} />
        ),
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: WebhookModal) => <DateComponent date={entity.createdAt} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: WebhookModal) => (
          <ActionButtons
            typeName="Webhook"
            name={entity.name}
            onRemove={this.handleRemove(entity.id)}
          />
        ),
      },
    ];
  }

  render() {
    const { webhooks } = this.props;
    const columns = this.getColumns();
    return (
      <Table<WebhookModal>
        loading={false}
        pagination={false}
        columns={columns}
        dataSource={webhooks}
      />
    );
  }
}

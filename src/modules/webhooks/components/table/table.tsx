import React, { Component } from 'react';
import { Table, Input } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { ActionButtons } from '../../../../components/action-buttons/action-buttons';
import { DateComponent } from '../../../ui-kit/date';
import { WebhookModal } from '../../../../redux/webhooks/types';
import { Copy } from './copy';
import { URLContainer } from './table.css';

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
          <URLContainer>
            <Input
              size="large"
              addonBefore="Private URL"
              addonAfter={<Copy url={entity.invokeUrl} />}
              disabled
              value={entity.invokeUrl}
            />
            {entity.isPublic && (
              <Input
                addonBefore="Public URL"
                size="large"
                addonAfter={<Copy url={entity.publicInvokeUrl} />}
                disabled
                value={entity.publicInvokeUrl}
              />
            )}
          </URLContainer>
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

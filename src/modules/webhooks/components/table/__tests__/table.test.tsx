import { mount } from 'enzyme';
import React from 'react';
import { Table } from 'antd';
import { ConnectionModal } from '../../../../../redux/connections/types';
import { ColumnProps } from 'antd/lib/table';
import { WebhookModal } from '../../../../../redux/webhooks/types';
import { WebhooksTable } from '../table';

describe('Webhooks Table', () => {
  const webhooksData: WebhookModal[] = [
    {
      name: 'Webhook Test',
      connectionId: 1,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      url: 'webhook.com',
    },
    {
      name: 'Slack Message',
      connectionId: 1,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      url: 'slack.com',
    },
  ];

  const onRemoveMock = jest.fn();
  beforeEach(() => {
    this.component = mount(<WebhooksTable webhooks={webhooksData} onRemove={onRemoveMock} />);
  });

  it('passes in data to table', () => {
    expect(this.component.find(Table).prop('dataSource')).toEqual(webhooksData);
  });

  it('passes entity name to action buttons', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    expect(actionButtons.props.name).toEqual(entity.name);
  });

  it('calls onRemove props when delete action button is called', () => {
    const actionButtonColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'action');
    const entity = {
      id: 1,
      name: 'test',
    };
    const actionButtons = actionButtonColumn.render(entity);
    actionButtons.props.onRemove();
    expect(onRemoveMock).toBeCalled();
  });
});

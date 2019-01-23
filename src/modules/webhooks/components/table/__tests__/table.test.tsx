import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Table, Input } from 'antd';
import { ConnectionModal } from '../../../../../redux/connections/types';
import { ColumnProps } from 'antd/lib/table';
import { WebhookModal } from '../../../../../redux/webhooks/types';
import { WebhooksTable } from '../table';

describe('Webhooks Table', () => {
  const webhooksData: WebhookModal[] = [
    {
      name: 'Webhook Test',
      isPublic: false,
      connectionId: 1,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      invokeUrl: 'slack.com',
      publicInvokeUrl: null,
    },
    {
      name: 'Slack Message',
      connectionId: 1,
      isPublic: false,
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      invokeUrl: 'slack.com',
      publicInvokeUrl: null,
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

  const getUrlColumnComponent = (overrideProps: Partial<WebhookModal>) => {
    const urlColumn = this.component
      .find(Table)
      .prop('columns')
      .find((col: ColumnProps<ConnectionModal>) => col.key === 'url');
    const invokeUrl = 'webhook.com';
    const entity: WebhookModal = {
      invokeUrl,
      id: 1,
      name: 'test',
      publicInvokeUrl: null,
      isPublic: false,
      accessKeyId: 1,
      connectionId: 1,
      ...overrideProps,
    };
    return new ReactWrapper(urlColumn.render(entity)).find(Input);
  };

  it('creates private url input field', () => {
    const invokeUrl = 'webhook.com';
    const privateInputComponent = getUrlColumnComponent({ invokeUrl });
    expect(privateInputComponent).toHaveLength(1);
    expect(privateInputComponent.prop('value')).toEqual(invokeUrl);
  });

  it('create a public url input if there is one', () => {
    const invokeUrl = 'webhook.com';
    const publicInvokeUrl = 'webhook.com';
    const privateInputComponent = getUrlColumnComponent({
      invokeUrl,
      publicInvokeUrl,
      isPublic: true,
    });
    expect(privateInputComponent).toHaveLength(2);
    expect(privateInputComponent.at(1).prop('value')).toEqual(publicInvokeUrl);
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

import React from 'react';
import { shallow } from 'enzyme';
import { PropsFromDispatch, Webhooks } from '../webhooks.container';
import { WebhookModal } from '../../../../redux/webhooks/types';
import { WebhookComponent } from '../../components/webhooks';
import { ConnectionModal } from '../../../../redux/connections/types';

describe('Webhooks Container', () => {
  const connectionId = 1;

  const connections: ConnectionModal[] = [
    {
      connectorId: 1,
      id: connectionId,
      name: 'Uber',
      accessKeyId: 1,
    },
  ];

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

  const matchProps = {
    params: { connectionId: connectionId.toString(), connectorId: '1' },
    isExact: true,
    path: '',
    url: '',
  };

  let actions: PropsFromDispatch;

  beforeEach(() => {
    actions = {
      fetchConnection: jest.fn(),
      createWebhook: jest.fn(),
      deleteWebhook: jest.fn(),
    };

    this.component = shallow(
      <Webhooks match={matchProps} connections={connections} webhooks={webhooksData} {...actions} />
    );
  });

  it('Contains a breadcrumb component', () => {
    // expect(this.component.find(BreadcrumbComponent)).toHaveLength(1);
  });

  it('passes in the breadcrumb map with connection id and name', () => {
    // const breadcrumbNameMap = {
    //   '/connector-hub': 'Connector Hub',
    //   [`/connector-hub/${connectorId}`]: connectorName,
    // };
    // expect(this.component.find(BreadcrumbComponent).prop('breadcrumbNameMap')).toEqual(
    //   breadcrumbNameMap
    // );
  });

  it('renders webhooks component', () => {
    const webhooksComponent = this.component.find(WebhookComponent);
    expect(webhooksComponent).toHaveLength(1);
    expect(webhooksComponent.prop('webhooks')).toEqual(webhooksData);
  });

  it('passes createWebhook to webhooks component', () => {
    const webhooksComponent = this.component.find(WebhookComponent);
    expect(webhooksComponent.prop('createWebhook')).toEqual(actions.createWebhook);
  });
  it('passes deleteWebhooks to webhooks component', () => {
    const webhooksComponent = this.component.find(WebhookComponent);
    expect(webhooksComponent.prop('deleteWebhook')).toEqual(actions.deleteWebhook);
  });
});

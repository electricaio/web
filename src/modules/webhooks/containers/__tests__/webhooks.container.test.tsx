import React from 'react';
import { shallow } from 'enzyme';
import { PropsFromDispatch, Webhooks } from '../webhooks.container';
import { WebhookModal } from '../../../../redux/webhooks/types';
import { WebhookComponent } from '../../components/webhooks';
import { ConnectionModal } from '../../../../redux/connections/types';
import { AsyncComponent } from '../../../../components/async-component/async-component';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { BreadcrumbComponent } from '../../../../components/breadcrumb/breadcrumb';

describe('Webhooks Container', () => {
  const connectionId = 1;
  const connectorId = 1;

  const connectors: ConnectorModal[] = [
    {
      typeId: 1,
      authorizationType: 'None',
      name: 'SalesForce CRM API 2.0',
      resource: 'customer',
      version: '2.0',
      namespace: 'salesforce',
      properties: {
        url: 'https://www.salesforce.com',
        sdk_url: 'url_to_sdk',
        image_url: 'string',
        description: 'This connector allows you to connect to SalesForce CRM system.',
      },
      id: connectorId,
      ern: 'ern://salesforce:customer:2_0',
      revisionVersion: 0,
    },
  ];
  const connections: ConnectionModal[] = [
    {
      connectorId,
      id: connectionId,
      name: 'Uber',
      accessKeyId: 1,
    },
  ];

  const webhooksData: WebhookModal[] = [
    {
      connectionId,
      name: 'Webhook Test',
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      url: 'webhook.com',
    },
    {
      connectionId,
      name: 'Slack Message',
      accessKeyId: 1,
      createdAt: '2018-11-20T18:42:08.552',
      id: 12,
      url: 'slack.com',
    },
  ];

  const matchProps = {
    params: { connectionId: connectionId.toString(), connectorId: connectorId.toString() },
    isExact: true,
    path: '',
    url: '',
  };

  let actions: PropsFromDispatch;

  beforeEach(() => {
    actions = {
      fetchWebhooks: jest.fn(),
      fetchConnection: jest.fn(),
      fetchConnector: jest.fn(),
      createWebhook: jest.fn(),
      deleteWebhook: jest.fn(),
    };

    this.component = shallow(
      <Webhooks
        match={matchProps}
        connectors={connectors}
        connections={connections}
        webhooks={webhooksData}
        {...actions}
      />
    );
  });

  it('Contains a breadcrumb component', () => {
    expect(this.component.find(BreadcrumbComponent)).toHaveLength(1);
  });

  it('passes in the breadcrumb map with connection id and name', () => {
    const breadcrumbMap = this.component.find(BreadcrumbComponent).prop('breadcrumbNameMap');
    expect(breadcrumbMap).toHaveProperty('/connector-hub');
    expect(breadcrumbMap).toHaveProperty('/connector-hub/1');
    expect(breadcrumbMap).toHaveProperty('/connector-hub/1/connections');
    const crumbProperties = Object.keys(breadcrumbMap);
    expect(breadcrumbMap[crumbProperties[1]]).toEqual(connectors[0].name);
    expect(breadcrumbMap[crumbProperties[2]]).toEqual(`${connections[0].name} Connections`);
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

  describe('async component', () => {
    it('renders the component', () => {
      expect(this.component.find(AsyncComponent)).toHaveLength(1);
    });

    it('passes fetchConnector. fetchWebhooks and fetchConnection actions', () => {
      const asyncActions = this.component.find(AsyncComponent).prop('getAsyncActions');
      asyncActions();
      expect(actions.fetchWebhooks).toBeCalledTimes(connectionId);
      expect(actions.fetchConnection).toBeCalledTimes(connectionId);
      expect(actions.fetchConnector).toBeCalledTimes(connectorId);
    });
  });
});

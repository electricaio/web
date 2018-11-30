import { mount } from 'enzyme';
import React from 'react';
import times from 'lodash/times';
import { CardCollection } from '../card-collection';
import { ConnectorCard } from '../connector-card';
import { ConnectorModal } from '../../../../../redux/connector-hub/types';
import { MemoryRouter } from 'react-router';

describe('CardCollection', () => {
  const connectorCount = 3;

  function createConnectors(count: number): ConnectorModal[] {
    return times(count, () => ({
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
      id: 4,
      ern: 'ern://salesforce:customer:2_0',
      revisionVersion: 0,
    }));
  }

  beforeEach(() => {
    this.CardCollection = mount(
      <MemoryRouter>
        <CardCollection connectors={createConnectors(connectorCount)} />
      </MemoryRouter>
    );
  });

  it('should show number of cards as connectors', () => {
    expect(this.CardCollection.find(ConnectorCard)).toHaveLength(connectorCount);
  });
  it('should show number of colums as the `COLUMN_CHUNK_COUNT` specifies', () => {
    expect(this.CardCollection.find(ConnectorCard)).toHaveLength(connectorCount);
  });
});

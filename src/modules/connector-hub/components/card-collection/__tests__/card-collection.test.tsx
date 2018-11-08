import { mount } from 'enzyme';
import React from 'react';
import times from 'lodash/times';
import { CardCollection } from '../card-collection';
import { ConnectorCard } from '../connector-card';
import { ConnectorModal } from '../../../../../redux/connector-hub/types';

describe('CardCollection', () => {
  const connectorCount = 3;

  function createConnectors(count: number): ConnectorModal[] {
    return times(count, () => ({
      id: '1',
      name: 'company name',
      image: 'image.png',
      ern: 'ern://company:customer:2.0',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo',
      keys: ['key1', 'key2'],
      type: 'Talent',
    }));
  }

  beforeEach(() => {
    this.CardCollection = mount(<CardCollection connectors={createConnectors(connectorCount)} />);
  });

  it('should show number of cards as connectors', () => {
    expect(this.CardCollection.find(ConnectorCard)).toHaveLength(connectorCount);
  });
  it('should show number of colums as the `COLUMN_CHUNK_COUNT` specifies', () => {
    expect(this.CardCollection.find(ConnectorCard)).toHaveLength(connectorCount);
  });
});

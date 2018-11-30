import React from 'react';
import { shallow } from 'enzyme';
import { ConnectorHubComponent } from '../connector-hub';
import { Header } from '../../header/header';
import { CardCollection } from '../../card-collection/card-collection';
import { CONNECTOR_HUB_DATA } from '../../../../../fixtures/connector-hub-data';

describe('Connector Hub component', () => {
  beforeEach(() => {
    this.container = shallow(<ConnectorHubComponent connectors={CONNECTOR_HUB_DATA} />);
  });

  it('renders Header', () => {
    expect(this.container.find(Header)).toHaveLength(1);
  });

  it('renders a CardCollection with the connectors', () => {
    const component = this.container.find(CardCollection);
    expect(component).toHaveLength(1);
    expect(component.prop('connectors')).toEqual(CONNECTOR_HUB_DATA);
  });
});

import { mount } from 'enzyme';
import React from 'react';
import { ConnectorCard } from '../connector-card';
import { StyledCard, StyledMeta } from '../connector-card.css';
import { Row, Col, Tag, Card, Button } from 'antd';
import { ConnectorModal } from '../../../../../redux/connector-hub/types';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';

interface TypeModel {
  id: number;
  name: string;
}
export const TYPE_NAMES_DATA: TypeModel[] = [
  { id: 1, name: 'Foundation' },
  { id: 2, name: 'CRM' },
  { id: 3, name: 'Talent' },
];

describe('ConnectorCard', () => {
  const connectorId = 4;
  const connector = (overrides: object = {}): ConnectorModal => ({
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
    ...overrides,
  });

  beforeEach(() => {
    this.connectorCard = mount(
      <MemoryRouter>
        <ConnectorCard connector={connector()} />
      </MemoryRouter>
    );
  });

  it('card contains connector name as a title', () => {
    expect(this.connectorCard.find(StyledCard).prop('title')).toEqual(connector().name);
  });

  it('contains a description with meta component', () => {
    expect(
      this.connectorCard
        .find(ConnectorCard)
        .find(StyledMeta)
        .prop('description')
    ).toEqual(connector().properties.description);
  });

  it('renders a two column grid with ern details', () => {
    const columns = this.connectorCard.find(Col);
    expect(this.connectorCard.find(Row)).toHaveLength(1);
    expect(columns).toHaveLength(2);
    expect(columns.at(0).text()).toEqual('ERN');
    expect(columns.at(1).text()).toEqual(connector().ern);
  });

  it('renders a tag with typeId', () => {
    const tags = this.connectorCard.find(Tag);
    expect(this.connectorCard.find(Card)).toHaveLength(1);
    expect(tags).toHaveLength(1);
    expect(tags.at(0).text()).toEqual(
      TYPE_NAMES_DATA.find(myObj => myObj.id === connector().typeId).name
    );
  });

  it('renders a Link in the button for routing to the connections page', () => {
    const configureButton = this.connectorCard.find(Button);
    expect(configureButton.find(Link).prop('to')).toEqual(
      `/connector-hub/${connectorId}/connections`
    );
  });
});

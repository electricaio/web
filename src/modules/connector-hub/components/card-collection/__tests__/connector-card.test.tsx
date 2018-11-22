import { mount } from 'enzyme';
import React from 'react';
import { ConnectorCard } from '../connector-card';
import { StyledCard, StyledMeta } from '../connector-card.css';
import { Row, Col } from 'antd';
import { ConnectorModal } from '../../../../../redux/connector-hub/types';

describe('ConnectorCard', () => {
  const connector = (overrides: object = {}): ConnectorModal => ({
    typeId: 1,
    authorizationType: "None",
    name: "SalesForce CRM API 2.0",
    resource: "customer",
    version: "2.0",
    namespace: "salesforce",
    properties: {
      url: "https://www.salesforce.com",
      sdk_url: "url_to_sdk",
      image_url: "string",
      description: "This connector allows you to connect to SalesForce CRM system."
    },
    id: 4,
    ern: "ern://salesforce:customer:2_0",
    revisionVersion: 0,
    ...overrides,
  });

  beforeEach(() => {
    this.connectorCard = mount(<ConnectorCard connector={connector()} />);
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
});

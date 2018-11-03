import { mount } from 'enzyme';
import React from 'react';
import { ConnectorCard } from '../connector-card';
import { StyledCard, StyledMeta, ButtonContainer } from '../connector-card.css';
import { StyledButton } from '../../../../ui-kit/button';
import { Row, Col } from 'antd';
import { ConnectorModal } from '../../../../../redux/connector-hub/types';

describe('ConnectorCard', () => {
  const connector = (overrides: object = {}): ConnectorModal => ({
    id: '1',
    name: 'company name',
    image: 'image.png',
    ern: 'ern://company:customer:2.0',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum commodo',
    keys: ['key1', 'key2'],
    type: 'Talent',
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
    ).toEqual(connector().description);
  });

  it('should render a button in the card displaying number of api keys', () => {
    const button = this.connectorCard.find(StyledButton);
    expect(button).toHaveLength(1);
    expect(button.prop('icon')).toEqual('key');
    expect(button.prop('type')).toEqual('primary');
    expect(button.text()).toEqual(`View ${connector().keys.length} keys`);
  });

  it('should render text when no api keys are available', () => {
    const noApiKeysConnectorCard = mount(<ConnectorCard connector={connector({ keys: [] })} />);
    const button = noApiKeysConnectorCard.find(StyledButton);
    expect(button).toHaveLength(0);
    expect(noApiKeysConnectorCard.find(ButtonContainer).text()).toEqual(
      'There are no keys for this connector'
    );
  });

  it('renders a two column grid with ern details', () => {
    const columns = this.connectorCard.find(Col);
    expect(this.connectorCard.find(Row)).toHaveLength(1);
    expect(columns).toHaveLength(2);
    expect(columns.at(0).text()).toEqual('ERN');
    expect(columns.at(1).text()).toEqual(connector().ern);
  });
});

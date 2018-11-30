import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import { ConnectorHub } from '../connector-hub.container';
import { ConnectorHubComponent } from '../../components/connector-hub/connector-hub';
import { CONNECTOR_HUB_DATA } from '../../../../fixtures/connector-hub-data';

describe('Connector Hub Container', () => {
  const fetchConnectorsMock = jest.fn();

  beforeEach(() => {
    this.container = shallow(
      <ConnectorHub loading connectors={CONNECTOR_HUB_DATA} fetchConnectors={fetchConnectorsMock} />
    );
  });

  it('calls fetchConnectors', () => {
    expect(fetchConnectorsMock).toBeCalled();
  });

  it('sets loading property on Spin component', () => {
    expect(this.container.find(Spin).prop('spinning')).toBeTruthy();
  });

  it('renders connector hub component with Spin component', () => {
    expect(this.container.find(Spin).find(ConnectorHubComponent)).toHaveLength(1);
  });

  it('passes login action to login component', () => {
    expect(
      this.container
        .find(Spin)
        .find(ConnectorHubComponent)
        .prop('connectors')
    ).toEqual(CONNECTOR_HUB_DATA);
  });
});

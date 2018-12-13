import React from 'react';
import { shallow } from 'enzyme';
import { ConnectorHub } from '../connector-hub.container';
import { ConnectorHubComponent } from '../../components/connector-hub/connector-hub';
import { CONNECTOR_HUB_DATA } from '../../../../fixtures/connector-hub-data';
import { AsyncComponent } from '../../../../components/async-component/async-component';

describe('Connector Hub Container', () => {
  const fetchConnectorsMock = jest.fn();

  beforeEach(() => {
    this.container = shallow(
      <ConnectorHub connectors={CONNECTOR_HUB_DATA} fetchConnectors={fetchConnectorsMock} />
    );
  });

  describe('async component', () => {
    it('renders the component', () => {
      expect(this.container.find(AsyncComponent)).toHaveLength(1);
    });

    it('passes fetchConnectors action', () => {
      const actions = this.container.find(AsyncComponent).prop('getAsyncActions');
      actions();
      expect(fetchConnectorsMock).toBeCalled();
    });
  });

  it('passes login action to login component', () => {
    expect(this.container.find(ConnectorHubComponent).prop('connectors')).toEqual(
      CONNECTOR_HUB_DATA
    );
  });
});

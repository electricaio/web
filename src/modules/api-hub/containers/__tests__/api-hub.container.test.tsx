import React from 'react';
import { shallow } from 'enzyme';
import { APIHub } from '../api-hub.container';
import { APIHubComponent } from '../../components/api-hub/api-hub';
import { CONNECTOR_HUB_DATA } from '../../../../fixtures/api-hub-data';
import { AsyncComponent } from '../../../../components/async-component/async-component';

describe('API Hub Container', () => {
  const fetchConnectorsMock = jest.fn();

  beforeEach(() => {
    this.container = shallow(
      <APIHub connectors={CONNECTOR_HUB_DATA} fetchConnectors={fetchConnectorsMock} />
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
    expect(this.container.find(APIHubComponent).prop('connectors')).toEqual(
      CONNECTOR_HUB_DATA
    );
  });
});

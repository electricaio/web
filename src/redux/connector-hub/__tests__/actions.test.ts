import { fetchConnectors } from '../actions';

import * as api from '../../../modules/utils/api';
import { ConnectorHubTypes } from '../types';

jest.mock('../../../modules/utils/api');

describe('ConnectorHub Actions', () => {
  describe('fetchConnectors', () => {
    describe('on api success', () => {
      let dispatchMock: any = null;
      const response = { name: 'chris' };

      const mockDispatchAndFetch = () => {
        dispatchMock = jest.fn();
        const getConnectorsMock = jest.spyOn(api, 'getConnectors');
        getConnectorsMock.mockImplementation(() => Promise.resolve({ data: response }));
        return fetchConnectors()(dispatchMock);
      };

      it('dispatches FETCH_CONNECTORS action, async', async () => {
        await mockDispatchAndFetch();
        const firstDispatchCall = dispatchMock.mock.calls[0][0];

        expect(firstDispatchCall.type).toEqual(ConnectorHubTypes.FETCH_CONNECTORS);
      });

      it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.type).toEqual(ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS);
      });

      it('dispatch response payload to reducers', async () => {
        await mockDispatchAndFetch();
        const successDispatchCall = dispatchMock.mock.calls[1][0];
        expect(successDispatchCall.payload).toEqual(response);
      });
    });
  });
});

import { ConnectorHubTypes, ConnectorModal } from '../types';
import { fetchConnectors, fetchConnector } from '../async';
import { withAuth } from '../../util';

jest.mock('../../../modules/utils/api');
jest.mock('../../util');

describe('ConnectorHub Actions', () => {
  let dispatchMock: jest.Mock;
  let mockApi: any;
  const connectorHubTesData: ConnectorModal[] = [
    {
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
    },
  ];

  beforeEach(() => {
    mockApi = {
      getConnectors: () => Promise.resolve({ data: connectorHubTesData }),
      getConnector: () => Promise.resolve({ data: connectorHubTesData[0] }),
    };
    dispatchMock = jest.fn();
    (withAuth as any).mockImplementation((_: any, callback: any) => {
      callback(mockApi, dispatchMock);
    });
  });

  describe('fetchConnectors', () => {
    it('dispatches FETCH_CONNECTORS action', async () => {
      await fetchConnectors()(dispatchMock);
      const firstDispatchCall = dispatchMock.mock.calls[0][0];

      expect(firstDispatchCall.type).toEqual(ConnectorHubTypes.FETCH_CONNECTORS);
    });

    it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
      await fetchConnectors()(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.type).toEqual(ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await fetchConnectors()(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[1][0];
      expect(successDispatchCall.payload).toEqual(connectorHubTesData);
    });
  });
  describe('fetchConnector', () => {
    const connectorId = 2;
    it('dispatch FETCH_CONNECTORS_SUCCESS action', async () => {
      await fetchConnector(connectorId)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.type).toEqual(ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS);
    });

    it('dispatch response payload to reducers', async () => {
      await fetchConnector(connectorId)(dispatchMock);
      const successDispatchCall = dispatchMock.mock.calls[0][0];
      expect(successDispatchCall.payload).toEqual(connectorHubTesData);
    });
  });
});

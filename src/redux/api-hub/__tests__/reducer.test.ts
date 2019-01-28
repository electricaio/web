import { connectorHubReducer } from '../reducer';
import { ConnectorHubState, ConnectorHubTypes, ConnectorModal } from '../types';

const initialState: ConnectorHubState = {
  data: [],
};

describe('connector reducer', () => {
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
  describe('create error', () => {
    it('sets data to the payload that is enterign', () => {
      expect(
        connectorHubReducer(initialState, {
          type: ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS,
          payload: connectorHubTesData,
        })
      ).toEqual({
        ...initialState,
        data: connectorHubTesData,
      });
    });
  });
});

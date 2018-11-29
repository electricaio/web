import { createAsyncAction } from 'typesafe-actions';
import { ConnectorHubTypes, ConnectorModal } from './types';

export const connectorHubAsyncActions = createAsyncAction(
  ConnectorHubTypes.FETCH_CONNECTORS,
  ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS,
  ConnectorHubTypes.FETCH_CONNECTORS_ERROR
)<void, ConnectorModal[], string>();

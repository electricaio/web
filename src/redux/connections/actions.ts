import { createAsyncAction } from 'typesafe-actions';
import { ConnectionModal, ConnectionTypes } from './types';

export const fetchConnectionsAsyncActions = createAsyncAction(
  ConnectionTypes.FETCH_CONNECTIONS,
  ConnectionTypes.FETCH_CONNECTIONS_SUCCESS,
  ConnectionTypes.FETCH_CONNECTIONS_ERROR
)<void, ConnectionModal[], string>();

export const createConnectionAsyncActions = createAsyncAction(
  ConnectionTypes.CREATE_CONNECTION,
  ConnectionTypes.CREATE_CONNECTION_SUCCESS,
  ConnectionTypes.CREATE_CONNECTION_ERROR
)<void, ConnectionModal, string>();

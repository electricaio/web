import { createAsyncAction } from 'typesafe-actions';
import { ConnectionModal, ConnectionTypes } from './types';
import { Dispatch } from 'redux';

export const connectionsAsyncActions = createAsyncAction(
  ConnectionTypes.FETCH_CONNECTIONS,
  ConnectionTypes.FETCH_CONNECTIONS_SUCCESS,
  ConnectionTypes.FETCH_CONNECTIONS_ERROR
)<void, ConnectionModal, string>();

export const fetchConnections = () => (dispatch: Dispatch) => {
  dispatch(connectionsAsyncActions.request());
};

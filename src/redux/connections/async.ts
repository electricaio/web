import { Dispatch } from 'redux';
import { ConnectionModal, AuthorizationType } from './types';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import {
  createConnectionAsyncActions,
  fetchConnectionsAsyncActions,
  deleteConnectionAsyncActions,
} from './actions';
import { ConnectorModal } from '../connector-hub/types';

export const fetchConnections = (userId: number, connectorId: number) => (dispatch: Dispatch) => {
  dispatch(fetchConnectionsAsyncActions.request());
  return withAuth(dispatch, (api: Api) => {
    return api.fetchConnections(userId, connectorId).then((result: AxiosResponse) => {
      dispatch(fetchConnectionsAsyncActions.success(result.data));
    });
  });
};

export const deleteConnection = (connectionId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api.deleteConnection(connectionId).then(() => {
      dispatch(deleteConnectionAsyncActions.success(connectionId));
    });
  });
};

export const createConnection = (
  connection: ConnectionModal,
  connector: ConnectorModal,
  authorizationType: AuthorizationType
) => (dispatch: Dispatch) => {
  dispatch(createConnectionAsyncActions.request());
  withAuth(dispatch, (api: Api) => {
    return api.createConnection(connection).then((result: AxiosResponse<ConnectionModal>) => {
      dispatch(createConnectionAsyncActions.success(result.data));
      return api.createConnectionAuthorization(
        result.data,
        connector.authorizationType,
        authorizationType
      );
    });
  });
};

import { Dispatch } from 'redux';
import { ConnectionModal, AuthorizationType } from './types';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import { createConnectionAsyncActions, fetchConnectionsAsyncActions } from './actions';

export const fetchConnections = (connectionId: number) => (dispatch: Dispatch) => {
  dispatch(fetchConnectionsAsyncActions.request());
  return dispatch(
    withAuth((api: Api) => {
      return api.fetchConnections(connectionId).then((result: AxiosResponse) => {
        dispatch(fetchConnectionsAsyncActions.success(result.data));
      });
    })
  );
};

export const createConnection = (
  connection: ConnectionModal,
  authorizationType: AuthorizationType
) => (dispatch: Dispatch) => {
  dispatch(createConnectionAsyncActions.request());
  return dispatch(
    withAuth((api: Api) => {
      return api.createConnection(connection).then((result: AxiosResponse<ConnectionModal>) => {
        dispatch(createConnectionAsyncActions.success(result.data));
        api.createConnectionAuthorization(connection, authorizationType);
      });
    })
  );
};

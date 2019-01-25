import { Dispatch } from 'redux';
import { ConnectionModal, AuthorizationType } from './types';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';

import {
  fetchAuthorizationSuccess,
  updateAuthorizationSuccess,
  fetchConnectionsSuccess,
  createConnectionsSuccess,
  deleteConnectionSuccess,
  updateConnectionSuccess,
  fetchConnectionSuccess,
} from './actions';
import { ConnectorModal } from '../connector-hub/types';
import { NO_AUTH } from '../../modules/connections/components/connection-form/authorizations/auth_types';

export const fetchConnections = (userId: number, connectorId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api.fetchConnections(userId, connectorId).then((result: AxiosResponse) => {
      dispatch(fetchConnectionsSuccess(result.data));
    });
  });
};

export const fetchConnection = (connectionId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api.fetchConnection(connectionId).then((result: AxiosResponse) => {
      dispatch(fetchConnectionSuccess(result.data));
    });
  });
};

export const deleteConnection = (connectionId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api.deleteConnection(connectionId).then(() => {
      dispatch(deleteConnectionSuccess(connectionId));
    });
  });
};

export const fetchAuthorization = (authorizationId: number, authorizationTypeName: string) => (
  dispatch: Dispatch
) => {
  debugger;
  if (authorizationTypeName.toLowerCase() === NO_AUTH) {
    return;
  }
  return withAuth(dispatch, (api: Api) => {
    return api
      .fetchAuthorization(authorizationId, authorizationTypeName)
      .then((result: AxiosResponse) => {
        dispatch(fetchAuthorizationSuccess(result.data));
      });
  });
};

export const createConnection = (
  connection: ConnectionModal,
  connector: ConnectorModal,
  authorizationType: AuthorizationType
) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) => {
    return api
      .createConnection(connection)
      .then((connectionResult: AxiosResponse<ConnectionModal>) => {
        dispatch(createConnectionsSuccess(connectionResult.data));
        if (connector.authorizationType.toLowerCase() !== NO_AUTH) {
          return api
            .createConnectionAuthorization(
              connectionResult.data,
              connector.authorizationType,
              authorizationType
            )
            .then((result: AxiosResponse<AuthorizationType>) => {
              dispatch(fetchAuthorizationSuccess(result.data));
              const connectionWithAuth: ConnectionModal = {
                ...connectionResult.data,
                authorizationId: result.data.id,
              };
              dispatch(updateConnectionSuccess(connectionWithAuth));
              // We need to fetch the connection again because creating an
              // authorization entity increments the revision version of the connection entity
              return fetchConnection(connectionResult.data.id)(dispatch);
            });
        }
      });
  });
};

export const updateConnection = (id: number, connection: ConnectionModal) => (
  dispatch: Dispatch
) => {
  return withAuth(dispatch, (api: Api) =>
    api.updateConnection(id, connection).then((result: AxiosResponse<ConnectionModal>) => {
      dispatch(updateConnectionSuccess(result.data));
    })
  );
};

export const updateAuthorization = (
  id: number,
  authorizationTypeName: string,
  authorizationType: AuthorizationType
) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api) =>
    api
      .updateAuthorization(id, authorizationTypeName, authorizationType)
      .then((result: AxiosResponse<AuthorizationType>) => {
        dispatch(updateAuthorizationSuccess(result.data));
      })
  );
};

import { createStandardAction } from 'typesafe-actions';
import { ConnectionModal, ConnectionTypes, AuthorizationType } from './types';

export const fetchConnectionsSuccess = createStandardAction(
  ConnectionTypes.FETCH_CONNECTIONS_SUCCESS
)<ConnectionModal[]>();

export const createConnectionsSuccess = createStandardAction(
  ConnectionTypes.CREATE_CONNECTION_SUCCESS
)<ConnectionModal>();

export const deleteConnectionSuccess = createStandardAction(
  ConnectionTypes.DELETE_CONNECTION_SUCCESS
)<number>();
export const updateConnectionSuccess = createStandardAction(
  ConnectionTypes.UPDATE_CONNECTION_SUCCESS
)<ConnectionModal>();

export const fetchAuthorizationSuccess = createStandardAction(ConnectionTypes.FETCH_AUTHORIZATION_SUCCESS)<
  AuthorizationType
>();
export const updateAuthorizationSuccess = createStandardAction(
  ConnectionTypes.UPDATE_AUTHORIZATION
)<AuthorizationType>();

import {  createAsyncAction } from 'typesafe-actions';
import { ConnectorHubTypes, ConnectorModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { getConnectors } from '../../modules/utils/api';

export const connectorHubAsyncActions = createAsyncAction(
    ConnectorHubTypes.FETCH_CONNECTORS,
    ConnectorHubTypes.FETCH_CONNECTORS_SUCCESS,
    ConnectorHubTypes.FETCH_CONNECTORS_ERROR
  )<void, ConnectorModal, string>();

export const fetchConnectors = () => (dispatch: Dispatch) => {
  dispatch(connectorHubAsyncActions.request());
  getConnectors().then((result: AxiosResponse<ConnectorModal>) => {
    dispatch(connectorHubAsyncActions.success(result.data));
  });
};

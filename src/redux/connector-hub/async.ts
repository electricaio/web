import { ConnectorModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import { connectorHubAsyncActions } from './actions';

export const fetchConnectors = () =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(connectorHubAsyncActions.request());
    return api.getConnectors().then((result: AxiosResponse<ConnectorModal[]>) => {
      dispatch(connectorHubAsyncActions.success(result.data));
    });
  });

import { ApiKeyModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import {
  createApiKeysAsyncActions,
  refreshKeysAsyncActions,
  removeKeysAsyncActions,
  fetchApiKeysAsyncActions,
  getApiKeyAsyncActions,
} from './actions';

export const createKey = (data: ApiKeyModal) =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(createApiKeysAsyncActions.request(data));
    return api.createAccessKey(data).then((result: AxiosResponse) => {
      dispatch(createApiKeysAsyncActions.success(result.data));
      dispatch(this.fetchKeys(data.userId));
    });
  });

export const refreshKey = (accessKeyId: number) =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(refreshKeysAsyncActions.request());

    return api.refreshAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(refreshKeysAsyncActions.success(result.data));
    });
  });
export const removeKey = (accessKeyId: number) =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(removeKeysAsyncActions.request());
    return api.removeAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(removeKeysAsyncActions.success(result.data));
    });
  });

export const fetchKeys = (userId: number) =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(fetchApiKeysAsyncActions.request());
    return api.getAccessKeys(userId).then((result: AxiosResponse<ApiKeyModal[]>) => {
      dispatch(fetchApiKeysAsyncActions.success(result.data));
    });
  });

export const getKey = (accessKeyId: number) =>
  withAuth((dispatch: Dispatch, api: Api) => {
    dispatch(getApiKeyAsyncActions.request());
    return api.getAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(getApiKeyAsyncActions.success(result.data));
    });
  });

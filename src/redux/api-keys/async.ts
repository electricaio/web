import { ApiKeyModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import {
  createApiKeysAsyncActions,
  removeKeysAsyncActions,
  fetchApiKeysAsyncActions,
  fetchApiKeyAsyncActions,
} from './actions';

export const createKey = (data: ApiKeyModal) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api, dispatch: Dispatch) => {
    dispatch(createApiKeysAsyncActions.request(data));
    return api.createAccessKey(data).then((result: AxiosResponse) => {
      dispatch(createApiKeysAsyncActions.success(result.data));
    });
  });
};

export const refreshKey = (accessKeyId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api, dispatch: Dispatch) => {
    dispatch(fetchApiKeyAsyncActions.request());

    return api.refreshAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(fetchApiKeyAsyncActions.success(result.data));
    });
  });
};

export const removeKey = (accessKeyId: number) => async (dispatch: Dispatch) =>
  await withAuth(dispatch, async (api: Api, dispatch: Dispatch) => {
    dispatch(removeKeysAsyncActions.request());
    const result: AxiosResponse = await api.removeAccessKey(accessKeyId);
    dispatch(removeKeysAsyncActions.success(result.data));
    return result.data;
  });

export const fetchKeys = (userId: number) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api, dispatch: Dispatch) => {
    dispatch(fetchApiKeysAsyncActions.request());
    return api.getAccessKeys(userId).then((result: AxiosResponse<ApiKeyModal[]>) => {
      dispatch(fetchApiKeysAsyncActions.success(result.data));
      return result.data;
    });
  });
};

export const getKey = (accessKeyId: number) => (dispatch: Dispatch) => {
  dispatch(fetchApiKeyAsyncActions.request());
  return withAuth(dispatch, (api: Api) => {
    return api.getAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(fetchApiKeyAsyncActions.success(result.data));
      return result.data;
    });
  });
};

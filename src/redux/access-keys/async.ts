import { AccessKeyModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import { Api } from '../../modules/utils/api';
import { withAuth } from '../util';
import {
  createAccessKeysAsyncActions,
  removeKeysAsyncActions,
  fetchAccessKeysAsyncActions,
  fetchApiKeyAsyncActions,
} from './actions';

export const createKey = (data: AccessKeyModal) => (dispatch: Dispatch) => {
  return withAuth(dispatch, (api: Api, dispatch: Dispatch) => {
    dispatch(createAccessKeysAsyncActions.request(data));
    return api.createAccessKey(data).then((result: AxiosResponse) => {
      dispatch(createAccessKeysAsyncActions.success(result.data));
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
    dispatch(fetchAccessKeysAsyncActions.request());
    return api.getAccessKeys(userId).then((result: AxiosResponse<AccessKeyModal[]>) => {
      dispatch(fetchAccessKeysAsyncActions.success(result.data));
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

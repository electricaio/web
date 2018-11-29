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

export const createKey = (data: ApiKeyModal) =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch(createApiKeysAsyncActions.request(data));
    return api.createAccessKey(data).then((result: AxiosResponse) => {
      dispatch(createApiKeysAsyncActions.success(result.data));
      dispatch(this.fetchKeys(data.userId));
    });
  });

export const refreshKey = (accessKeyId: number) =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch(fetchApiKeyAsyncActions.request());

    return api.refreshAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(fetchApiKeyAsyncActions.success(result.data));
    });
  });
export const removeKey = (accessKeyId: number) =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch(removeKeysAsyncActions.request());
    return api.removeAccessKey(accessKeyId).then((result: AxiosResponse) => {
      dispatch(removeKeysAsyncActions.success(result.data));
    });
  });

export const fetchKeys = (userId: number) =>
  withAuth((api: Api, dispatch: Dispatch) => {
    dispatch(fetchApiKeysAsyncActions.request());
    return api.getAccessKeys(userId).then((result: AxiosResponse<ApiKeyModal[]>) => {
      dispatch(fetchApiKeysAsyncActions.success(result.data));
    });
  });

export const getKey = (accessKeyId: number) => (dispatch: Dispatch) => {
  dispatch(fetchApiKeyAsyncActions.request());
  dispatch(
    withAuth((api: Api) => {
      return api.getAccessKey(accessKeyId).then((result: AxiosResponse) => {
        dispatch(fetchApiKeyAsyncActions.success(result.data));
      });
    })
  );
};

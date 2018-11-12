import { createAsyncAction } from 'typesafe-actions';
import { ApiKeysTypes, ApiKeyModal } from './types';
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
import {
  createAccessKey,
  getAccessKeys,
  refreshAccessKey,
  removeAccessKey,
} from '../../modules/utils/api';

export const createApiKeysAsyncActions = createAsyncAction(
  ApiKeysTypes.CREATE_ACCESS_KEY,
  ApiKeysTypes.CREATE_ACCESS_KEY_SUCCESS,
  ApiKeysTypes.CREATE_ACCESS_KEY_ERROR
)<ApiKeyModal, ApiKeyModal, string>();

export const refreshKeysAsyncActions = createAsyncAction(
  ApiKeysTypes.REFRESH_KEY,
  ApiKeysTypes.REFRESH_KEY_SUCCESS,
  ApiKeysTypes.REFRESH_KEY_ERROR
)<void, ApiKeyModal, string>();

export const fetchApiKeysAsyncActions = createAsyncAction(
  ApiKeysTypes.FETCH_ACCESS_KEYS,
  ApiKeysTypes.FETCH_ACCESS_KEYS_SUCCESS,
  ApiKeysTypes.FETCH_ACCESS_KEYS_ERROR
)<void, ApiKeyModal[], string>();

export const removeKeysAsyncActions = createAsyncAction(
  ApiKeysTypes.REMOVE_ACCESS_KEY,
  ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS,
  ApiKeysTypes.REMOVE_ACCESS_KEY_ERROR
)<void, void, string>();

export const createKey = (newKey: ApiKeyModal) => (dispatch: Dispatch) => {
  dispatch(createApiKeysAsyncActions.request(newKey));
  createAccessKey(newKey).then((result: AxiosResponse) => {
    dispatch(createApiKeysAsyncActions.success(result.data));
  });
};

export const refreshKey = (accessKeyId: string) => (dispatch: Dispatch) => {
  dispatch(refreshKeysAsyncActions.request());
  refreshAccessKey(accessKeyId).then((result: AxiosResponse) => {
    dispatch(refreshKeysAsyncActions.success(result.data));
  });
};
export const removeKey = (accessKeyId: string) => (dispatch: Dispatch) => {
  dispatch(removeKeysAsyncActions.request());
  removeAccessKey(accessKeyId).then((result: AxiosResponse) => {
    dispatch(removeKeysAsyncActions.success());
  });
};

export const fetchKeys = () => (dispatch: Dispatch) => {
  dispatch(fetchApiKeysAsyncActions.request());
  getAccessKeys().then((result: AxiosResponse) => {
    dispatch(fetchApiKeysAsyncActions.success(result.data));
  });
};

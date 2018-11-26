import { createAsyncAction } from 'typesafe-actions';
import { ApiKeysTypes, ApiKeyModal } from './types';

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

export const getApiKeyAsyncActions = createAsyncAction(
  ApiKeysTypes.FETCH_ACCESS_KEY,
  ApiKeysTypes.FETCH_ACCESS_KEY_SUCCESS,
  ApiKeysTypes.FETCH_ACCESS_KEY_ERROR
)<void, ApiKeyModal, string>();

export const removeKeysAsyncActions = createAsyncAction(
  ApiKeysTypes.REMOVE_ACCESS_KEY,
  ApiKeysTypes.REMOVE_ACCESS_KEY_SUCCESS,
  ApiKeysTypes.REMOVE_ACCESS_KEY_ERROR
)<void, ApiKeyModal, string>();

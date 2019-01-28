import { createAsyncAction } from 'typesafe-actions';
import { AccessKeysTypes, AccessKeyModal } from './types';

export const createAccessKeysAsyncActions = createAsyncAction(
  AccessKeysTypes.CREATE_ACCESS_KEY,
  AccessKeysTypes.CREATE_ACCESS_KEY_SUCCESS,
  AccessKeysTypes.CREATE_ACCESS_KEY_ERROR
)<AccessKeyModal, AccessKeyModal, string>();

export const fetchAccessKeysAsyncActions = createAsyncAction(
  AccessKeysTypes.FETCH_ACCESS_KEYS,
  AccessKeysTypes.FETCH_ACCESS_KEYS_SUCCESS,
  AccessKeysTypes.FETCH_ACCESS_KEYS_ERROR
)<void, AccessKeyModal[], string>();

export const fetchApiKeyAsyncActions = createAsyncAction(
  AccessKeysTypes.FETCH_ACCESS_KEY,
  AccessKeysTypes.FETCH_ACCESS_KEY_SUCCESS,
  AccessKeysTypes.FETCH_ACCESS_KEY_ERROR
)<void, AccessKeyModal, string>();

export const removeKeysAsyncActions = createAsyncAction(
  AccessKeysTypes.REMOVE_ACCESS_KEY,
  AccessKeysTypes.REMOVE_ACCESS_KEY_SUCCESS,
  AccessKeysTypes.REMOVE_ACCESS_KEY_ERROR
)<void, AccessKeyModal, string>();

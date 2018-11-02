import { action } from 'typesafe-actions';
import { ApiKeysTypes, ApiKeyModal } from './types';

export const createKey = (newKey: ApiKeyModal) => action(ApiKeysTypes.CREATE_ACCESS_KEY);
export const removeKey = (id: string) => action(ApiKeysTypes.REMOVE_ACCESS_KEY);
export const fetchKeys = () => action(ApiKeysTypes.FETCH_ACCESS_KEYS);

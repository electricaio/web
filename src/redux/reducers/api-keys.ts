import { TApiKeyTableEntity } from '../../models/ApiKeyTableEntity';
import { Reducer } from 'redux';
import { TAction } from '../actions';
import { COMMIT_KEY, REFRESH_KEY, REMOVE_KEY } from '../actions/api-keys';
import { API_KEYS_TABLE_DATA } from '../../fixtures/api-keys-table-data';
import { identity } from 'fp-ts/lib/function';

const generateKey = identity;
const refreshKey = (el: TApiKeyTableEntity) => ({
  ...el,
  key: generateKey(el.key),
});

export const keyReducer: Reducer<TApiKeyTableEntity[], TAction> = (
  state = API_KEYS_TABLE_DATA,
  action
) => {
  switch (action.type) {
    case COMMIT_KEY:
      return [...state, action.payload.entity];

    case REMOVE_KEY:
      return state.filter(el => el.key !== action.payload.key);

    case REFRESH_KEY:
      return state.map(el => (el.key === action.payload.key ? refreshKey(el) : el));

    default:
      return state;
  }
};

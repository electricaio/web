import { TApiKeyTableEntity } from '../../models/ApiKeyTableEntity';
import { Reducer } from 'redux';
import { TAction } from '../actions';
import { COMMIT_KEY, REFRESH_KEY, REMOVE_KEY } from '../actions/api-keys';
import { API_KEYS_TABLE_DATA } from '../../fixtures/api-keys-table-data';

const refreshKey = (el: TApiKeyTableEntity) => ({
  ...el,
  key: `${el.key}_new`,
});

export const keyReducer: Reducer<TApiKeyTableEntity[], TAction> = (
  state = API_KEYS_TABLE_DATA,
  action
) => {
  switch (action.type) {
    case COMMIT_KEY:
      return [...state, action.payload.entity];

    case REMOVE_KEY:
      return state.filter(el => el.id !== action.payload.id);

    case REFRESH_KEY:
      return state.map(el => (el.id === action.payload.id ? refreshKey(el) : el));

    default:
      return state;
  }
};

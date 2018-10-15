import { applyMiddleware, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { TApiKeyTableEntity } from '../models/ApiKeyTableEntity';
import { TAction } from './actions';
import promise = require('redux-promise');

export type TAppState = {
  apiKeys: TApiKeyTableEntity[];
  isNewEntity: boolean;
};

export function configureStore(initialState: Partial<TAppState> = {}) {
  // TODO: fix {} {} below
  return createStore<TAppState, TAction, {}, {}>(
    rootReducer,
    initialState,
    applyMiddleware(promise, thunk)
  );
}

export const store: Store<TAppState, TAction> = configureStore();

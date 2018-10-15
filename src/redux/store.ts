import { applyMiddleware, createStore, Store } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { TApiKeyTableEntity } from '../models/ApiKeyTableEntity';
import { TAction } from './actions';

export type TAppState = {
  apiKeys: TApiKeyTableEntity[];
};

export function configureStore(initialState: Partial<TAppState> = {}) {
  // TODO: fix {} {} below
  return createStore<TAppState, TAction, {}, {}>(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promiseMiddleware())
  );
}

export const store: Store<TAppState, TAction> = configureStore();

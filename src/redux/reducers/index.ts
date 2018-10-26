import { keyReducer } from './api-keys';
import { connectorsReducer } from './connector-hub';
import { combineReducers, ReducersMapObject } from 'redux';
import { TAction } from '../actions';
import { TAppState } from '../store';

export const reducersMapObject: ReducersMapObject<TAppState, TAction> = {
  apiKeys: keyReducer,
  connectors: connectorsReducer,
};

export const rootReducer = combineReducers(reducersMapObject);

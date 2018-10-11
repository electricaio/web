import { isNewEntityReducer, keyReducer } from './api-keys';
import { combineReducers, ReducersMapObject } from 'redux';
import { TAction } from '../actions';
import { TAppState } from '../store';

export const reducersMapObject: ReducersMapObject<TAppState, TAction> = {
  data: keyReducer,
  isNewEntity: isNewEntityReducer,
};

export const rootReducer = combineReducers(reducersMapObject);

import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise';
import stlReducer from './reducers/stl-reducer';
import userReducer from './reducers/user-reducer';

export const reducers = combineReducers({
  stlHub: stlReducer,
  user: userReducer,
});

export function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(promise, thunk));
}

export const store = configureStore();
window.store = store;

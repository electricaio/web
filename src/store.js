import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

export const reducers = combineReducers({});

export function configureStore(initialState = {}) {
  return createStore(reducers, initialState, applyMiddleware(promise, thunk));
}

export const store = configureStore();
window.store = store;

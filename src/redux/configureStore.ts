import { Store, createStore, applyMiddleware } from 'redux';
import { History } from 'history';

import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import { ApplicationState, rootReducer } from './store';

export default function configureStore(
  history: History,
  initialState?: ApplicationState
): Store<ApplicationState> {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk, promiseMiddleware()));

  return store;
}

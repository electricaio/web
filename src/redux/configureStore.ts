import { Store, createStore, applyMiddleware } from 'redux';
import { History } from 'history';

import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { ApplicationState, rootReducer } from './store';

export default function configureStore(
  history: History,
  initialState?: ApplicationState
): Store<ApplicationState> {
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(routerMiddleware(history), thunk, promiseMiddleware())
  );

  return store;
}

import { Store, createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';

import { History } from 'history';

import promiseMiddleware from 'redux-promise';

import thunk from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import requestMiddleware from './middleware/requestMiddleware';

import { ApplicationState, rootReducer } from './store';

export default (history: History, initialState?: ApplicationState) => {
  const store: Store<ApplicationState> = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    applyMiddleware(requestMiddleware(), thunk, routerMiddleware(history), promiseMiddleware)
  );
  const persistor = persistStore(store);

  return { store, persistor };
};

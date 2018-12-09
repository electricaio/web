import { combineReducers, Dispatch, Action, AnyAction } from 'redux';

import { authReducer } from './auth/reducer';
import { AuthState } from './auth/types';
import { ApiKeysState } from './api-keys/types';
import { ConnectorHubState } from './connector-hub/types';
import { connectorHubReducer } from './connector-hub/reducer';
import { apiKeysReducer } from './api-keys/reducer';
import { ConnectionsState } from './connections/types';
import { connectionsReducer } from './connections/reducer';
import { errorReducer } from './error/reducer';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ErrorsState } from './error/types';

// The top-level state object
export interface ApplicationState {
  auth: AuthState;
  apiKeys: ApiKeysState;
  connectors: ConnectorHubState;
  connections: ConnectionsState;
  error: ErrorsState;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

const authPersistConfig = {
  storage,
  key: 'auth',
  whitelist: ['tokens'],
};
// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  auth: persistReducer(authPersistConfig, authReducer),
  connectors: connectorHubReducer,
  apiKeys: apiKeysReducer,
  connections: connectionsReducer,
  error: errorReducer,
});

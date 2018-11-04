import { combineReducers, Dispatch, Action, AnyAction } from 'redux';

import { userReducer } from './user/reducer';
import { UserState } from './user/types';
import { ApiKeysState } from './api-keys/types';
import { ConnectorHubState } from './connector-hub/types';
import { connectorHubReducer } from './connector-hub/reducer';
import { apiKeysReducer } from './api-keys/reducer';

// The top-level state object
export interface ApplicationState {
  user: UserState;
  apiKeys: ApiKeysState;
  connectors: ConnectorHubState;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = combineReducers<ApplicationState>({
  user: userReducer,
  connectors: connectorHubReducer,
  apiKeys: apiKeysReducer,
});

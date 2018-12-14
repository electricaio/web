import { Reducer } from 'redux';
import { WebhooksState, WebhookModal } from './types';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';

export type WebhooksActionType = ActionType<typeof actions>;

const initialState: WebhooksState = {
  data: [],
};

const reducer: Reducer<WebhooksState> = (
  state = initialState,
  action: WebhooksActionType
): WebhooksState => {
  switch (action.type) {
    case getType(actions.createWebhookAsyncActions.success): {
      return { ...state, data: state.data.concat(action.payload) };
    }
    case getType(actions.fetchWebhooksAsyncActions.success): {
      return { ...state, data: action.payload };
    }
    case getType(actions.deleteWebhookAsyncActions.success): {
      return {
        ...state,
        data: state.data.filter((webhook: WebhookModal) => webhook.id !== action.payload),
      };
    }

    default: {
      return state;
    }
  }
};

export { reducer as webhooksReducer };

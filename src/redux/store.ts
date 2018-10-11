import { createStore, Store } from "redux";
import { rootReducer } from "./reducers";
import { TApiKeyTableEntity } from "../models/ApiKeyTableEntity";
import { TAction } from "./actions";

export type TAppState = {
  data: TApiKeyTableEntity[],
  isNewEntity: boolean,
};

export function configureStore(initialState: Partial<TAppState> = {}) {
  // TODO: fix {} {} below && add applyMiddleware(promise, thunk)
  return createStore<TAppState, TAction, {}, {}>(rootReducer, initialState);
}

export const store: Store<TAppState, TAction> = configureStore();

export const FETCH_KEY = 'FETCH_KEY';

// action types
export type TFetchKey = {
  type: typeof FETCH_KEY;
};

export type TFetchKeyAC = () => TFetchKey;

// action creators
export const fetchKeyAC: TFetchKeyAC = () => ({
  type: FETCH_KEY,
});

export type TConnectorTypeAction = TFetchKey;

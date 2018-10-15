import { TApiKeyTableEntity } from '../../models/ApiKeyTableEntity';

export const COMMIT_KEY = 'COMMIT_KEY';
export const REMOVE_KEY = 'REMOVE_KEY';
export const REFRESH_KEY = 'REFRESH_KEY';

// action types
export type TCommitKey = {
  type: typeof COMMIT_KEY;
  payload: {
    entity: TApiKeyTableEntity;
  };
};

export type TRemoveKey = {
  type: typeof REMOVE_KEY;
  payload: {
    key: string;
  };
};

export type TRefreshKey = {
  type: typeof REFRESH_KEY;
  payload: {
    key: string;
  };
};

// action creators types
export type TCommitKeyAC = (entity: TApiKeyTableEntity) => TCommitKey;
export type TRemoveKeyAC = (key: string) => TRemoveKey;
export type TRefreshKeyAC = (key: string) => TRefreshKey;

// action creators
export const commitKeyAC: TCommitKeyAC = entity => ({
  type: COMMIT_KEY,
  payload: {
    entity,
  },
});

export const removeKeyAC: TRemoveKeyAC = key => ({
  type: REMOVE_KEY,
  payload: {
    key,
  },
});

export const refreshKeyAC: TRefreshKeyAC = key => ({
  type: REFRESH_KEY,
  payload: {
    key,
  },
});

// union
export type TApiKeysAction = TCommitKey | TRemoveKey | TRefreshKey;

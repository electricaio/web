import { Divider } from 'antd';
import * as React from 'react';
import { SFC } from 'react';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { DeleteButton, RefreshButton } from './action-buttons.css';

export type TActionButtons = {
  entity: TApiKeyTableEntity;
  onRefresh: (id: string) => void;
  onRemove: (id: string) => void;
};

export const ActionButtons: SFC<TActionButtons> = ({ entity, onRefresh, onRemove }) => (
  <div>
    <RefreshButton onClick={() => onRefresh(entity.id)}>Refresh</RefreshButton>
    <Divider type="vertical" />
    <DeleteButton onClick={() => onRemove(entity.id)}>Delete</DeleteButton>
  </div>
);

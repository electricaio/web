import { SFC } from 'react';
import * as React from 'react';
import { Container, RefreshButton, RemoveButton } from './action-buttons.css';

export type TActionButtonsNewProps = {
  onRefresh: () => void;
  onRemove: () => void;
};

export const ActionButtons: SFC<TActionButtonsNewProps> = ({ onRefresh, onRemove }) => (
  <Container>
    <RefreshButton onClick={onRefresh}>Refresh</RefreshButton>
    <RemoveButton onClick={onRemove}>Delete</RemoveButton>
  </Container>
);

import { ApiKeysTable } from '../table/table';
import { ApiIcon } from './api-keys.css';
import { Header } from '../../../ui-kit/header';
import React, { Component, Fragment } from 'react';
import { ButtonActionModal } from '../modal-button-action/modal-button-action';
import { NewApiButton } from '../modal-button-action/modal-button-action.css';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { removeKey, createKey, refreshKey } from '../../../../redux/api-keys/async';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  apiKeys: ApiKeyModal[];
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  refreshKey: typeof refreshKey;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class ApiKeys extends Component<AllProps> {
  handleRefresh = (id: number) => {
    const { refreshKey } = this.props;
    refreshKey(id);
  };

  handleRemove = (id: number) => {
    const { removeKey } = this.props;
    removeKey(id);
  };

  handleCommit = (apiKey: ApiKeyModal) => {
    const { createKey } = this.props;
    createKey({ name: apiKey.name, userId: this.props.userId });
  };

  render() {
    const { apiKeys } = this.props;

    return (
      <Fragment>
        <Header>
          <ApiIcon type="setting" theme="outlined" />
          These API Keys grant developers the ability to access electrica services in the Cloud.
          Keep them confidential.
        </Header>
        <ApiKeysTable data={apiKeys} onRemove={this.handleRemove} onRefresh={this.handleRefresh} />
        <ButtonActionModal
          title="Generate New API Key"
          submitText="Create"
          onCommit={this.handleCommit}
        >
          <NewApiButton type="primary">Generate New API Key</NewApiButton>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

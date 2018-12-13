import { ApiKeysTable } from '../table/table';
import { ApiIcon } from './api-keys.css';
import { Header } from '../../../ui-kit/header';
import React, { Component, Fragment } from 'react';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { removeKey, createKey, refreshKey } from '../../../../redux/api-keys/async';
import { ButtonActionModal } from '../../../ui-kit/modal-button-action/modal-button-action';
import { ApiKeyForm } from '../api-key-form/api-key-form';
import { StyledButton } from '../../../ui-kit/button';

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
    const { createKey, userId } = this.props;
    createKey({ ...apiKey, userId });
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
          formComponent={<ApiKeyForm name={name} />}
        >
          <StyledButton type="primary">Generate New API Key</StyledButton>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

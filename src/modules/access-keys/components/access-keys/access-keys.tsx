import { AccessKeysTable } from '../table/table';
import { ApiIcon } from './access-keys.css';
import { Header } from '../../../ui-kit/header';
import React, { Component, Fragment } from 'react';
import { AccessKeyModal } from '../../../../redux/access-keys/types';
import { removeKey, createKey, refreshKey } from '../../../../redux/access-keys/async';
import { ButtonActionModal } from '../../../ui-kit/modal-button-action/modal-button-action';
import { AccessKeyForm } from '../access-key-form/access-key-form';
import { StyledButton } from '../../../ui-kit/button';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  accessKeys: AccessKeyModal[];
  userId: number;
}

interface PropsFromDispatch {
  removeKey: typeof removeKey;
  createKey: typeof createKey;
  refreshKey: typeof refreshKey;
}

type AllProps = PropsFromState & PropsFromDispatch;

export class AccessKeys extends Component<AllProps> {
  handleRefresh = (id: number) => {
    const { refreshKey } = this.props;
    refreshKey(id);
  };

  handleRemove = (id: number) => {
    const { removeKey } = this.props;
    removeKey(id);
  };

  handleCommit = (apiKey: AccessKeyModal) => {
    const { createKey, userId } = this.props;
    createKey({ ...apiKey, userId });
  };

  render() {
    const { accessKeys } = this.props;

    return (
      <Fragment>
        <Header>
          <ApiIcon type="setting" theme="outlined" />
          These Access Keys grant developers the ability to access electrica services in the Cloud.
          Keep them confidential.
        </Header>
        <AccessKeysTable
          data={accessKeys}
          onRemove={this.handleRemove}
          onRefresh={this.handleRefresh}
        />
        <ButtonActionModal
          title="Generate a new Access Key"
          submitText="Create"
          onCommit={this.handleCommit}
          formComponent={<AccessKeyForm name={name} />}
        >
          <StyledButton type="primary">Generate a new Access Key</StyledButton>
        </ButtonActionModal>
      </Fragment>
    );
  }
}

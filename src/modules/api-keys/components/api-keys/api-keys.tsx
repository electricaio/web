import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ApiKeysTable } from '../table/table';
import { ApiIcon } from './api-keys.css';
import { Header } from '../../../ui-kit/header';
import React, { Component, Fragment } from 'react';
import { ButtonActionModal } from '../modal-button-action/modal-button-action';
import { NewApiButton } from '../modal-button-action/modal-button-action.css';

export type TApiKeysProps = {
  data: TApiKeyTableEntity[];
  onRemove: (id: string) => void;
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export class ApiKeys extends Component<TApiKeysProps> {
  handleRemove = (id: string) => {
    const { onRemove } = this.props;
    onRemove(id);
  };
  handleCommit = (el: TApiKeyTableEntity) => {
    const { onCommit } = this.props;
    onCommit(el);
  };

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <Header>
          <ApiIcon type="setting" theme="outlined" />
          These API Keys grant developers the ability to access electrica services in the Cloud.
          Keep them confidential.
        </Header>
        <ApiKeysTable data={data} onRemove={this.handleRemove} />
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

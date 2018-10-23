import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ApiKeysTable } from '../table/table';
import { ApiIcon } from './api-keys.css';
import { Header } from '../../../ui-kit/header';
import React, { Component, Fragment } from 'react';
import { NewKeyModal } from '../new-api-key-modal/new-key-modal';

export type TApiKeysProps = {
  data: TApiKeyTableEntity[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export class ApiKeys extends Component<TApiKeysProps> {
  handleRemove = (id: string) => {
    const { onRemove } = this.props;
    onRemove(id);
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
        <ApiKeysTable data={data} onRemove={this.handleRemove} onCommit={this.handleCommit} />
        <NewKeyModal onCommit={this.handleCommit} />
      </Fragment>
    );
  }

  handleCommit = (el: TApiKeyTableEntity) => {
    const { onCommit } = this.props;

    onCommit(el);
  };
}

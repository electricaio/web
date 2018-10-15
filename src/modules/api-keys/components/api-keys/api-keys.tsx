import * as React from 'react';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { StyledCard } from './api-keys.css';
import { ApiKeysTable } from '../table/table';
import { Component, Fragment } from 'react';

export type TApiKeysProps = {
  data: TApiKeyTableEntity[];
  onRefresh: (id: string) => void;
  onRemove: (id: string) => void;
};

export class ApiKeys extends Component<TApiKeysProps> {
  render() {
    const { data, onRefresh, onRemove } = this.props;

    return (
      <Fragment>
        <StyledCard>
          These API Keys grant developers the ability to access electrica services in the Cloud.
          Keep them confidential
        </StyledCard>
        <ApiKeysTable data={data} onRefresh={onRefresh} onRemove={onRemove} />
      </Fragment>
    );
  }
}

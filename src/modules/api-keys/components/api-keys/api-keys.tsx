import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { Table } from '../table/table';
import { StyledDiv, NewButton, Card, Icon } from './api-keys.css';
import React, { Component, Fragment } from 'react';
import logo from '../../../../assets/api.svg';

export type TApiKeysProps = {
  data: TApiKeyTableEntity[];
  onRefresh: (id: string) => void;
  onRemove: (id: string) => void;
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export type TApiKeysState = {
  isNewEntity: boolean;
};

export class ApiKeys extends Component<TApiKeysProps, TApiKeysState> {
  readonly state: TApiKeysState = {
    isNewEntity: false,
  };

  render() {
    const { data, onRefresh, onRemove } = this.props;
    const { isNewEntity } = this.state;

    return (
      <Fragment>
        <Card>
          <Icon src={logo} />
          These API Keys grant developers the ability to access electrica services in the Cloud.
          Keep them confidential.
        </Card>
        <Table
          data={data}
          onRefresh={onRefresh}
          onRemove={onRemove}
          isNewEntity={isNewEntity}
          onCommit={this.handleCommit}
        />
        <StyledDiv>
          <NewButton onClick={this.handleNewEntityClick}>New</NewButton>
        </StyledDiv>
      </Fragment>
    );
  }

  handleCommit = (el: TApiKeyTableEntity) => {
    const { onCommit } = this.props;

    onCommit(el);
    this.setState({ isNewEntity: false });
  };

  handleNewEntityClick = () => {
    const { isNewEntity } = this.state;

    if (!isNewEntity) {
      this.setState({ isNewEntity: true });
    }
  };
}

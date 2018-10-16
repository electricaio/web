import * as React from 'react';
import { Component, SyntheticEvent } from 'react';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ActionButtons } from './action-buttons';
import { RefreshButton } from './action-buttons.css';
import {
  ActionCell,
  ActionHeader,
  Container,
  CreatedCell,
  CreatedHeader,
  EmptyCell,
  Inner,
  Input,
  KeyCell,
  KeyHeader,
  NameCell,
  NameHeader,
  StyledTable,
  Tr,
  TrHead,
} from './table.css';
import format = require('date-fns/format');

const generateId = () => Math.floor(Math.random() * 100000).toString();

export type TTableProps = {
  data: TApiKeyTableEntity[];
  isNewEntity: boolean;
  onRemove: (id: string) => void;
  onRefresh: (id: string) => void;
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export type TTableState = {
  name: string;
  key: string;
};

export class Table extends Component<TTableProps, TTableState> {
  readonly state = {
    name: '',
    key: '',
  };

  render() {
    const { data, isNewEntity } = this.props;

    return (
      <Container>
        <Inner>
          <StyledTable>
            <thead>
              <TrHead>
                <EmptyCell />
                <NameHeader>Name</NameHeader>
                <KeyHeader>Key</KeyHeader>
                <CreatedHeader>Date Created</CreatedHeader>
                <ActionHeader>Action</ActionHeader>
                <EmptyCell />
                <th />
              </TrHead>
            </thead>
            <tbody>
              {data.map(el => (
                <Tr key={el.id}>
                  <EmptyCell />
                  <NameCell>{el.name}</NameCell>
                  <KeyCell>{el.key}</KeyCell>
                  <CreatedCell>{format(el.created, 'DD/MM/YY')}</CreatedCell>
                  <ActionCell>
                    <ActionButtons
                      onRemove={this.handleRemove(el.id)}
                      onRefresh={this.handleRefresh(el.id)}
                    />
                  </ActionCell>
                  <EmptyCell />
                  <td />
                </Tr>
              ))}
              {isNewEntity && (
                <Tr>
                  <EmptyCell />
                  <NameCell>
                    <Input onBlur={this.handleNameUpdate} />
                  </NameCell>
                  <KeyCell>
                    <Input onBlur={this.handleKeyUpdate} />
                  </KeyCell>
                  <CreatedCell>{format(new Date(), 'DD/MM/YY')}</CreatedCell>
                  <ActionCell>
                    <RefreshButton onClick={this.handleCommitKey}>Add</RefreshButton>
                  </ActionCell>
                  <EmptyCell />
                  <td />
                </Tr>
              )}
            </tbody>
          </StyledTable>
        </Inner>
      </Container>
    );
  }

  handleNameUpdate = (e: SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.value;

    this.setState(() => ({
      name,
    }));
  };

  handleKeyUpdate = (e: SyntheticEvent<HTMLInputElement>) => {
    const key = e.currentTarget.value;

    this.setState(() => ({
      key,
    }));
  };

  handleRemove = (id: string) => () => {
    this.props.onRemove(id);
  };

  handleRefresh = (id: string) => () => {
    this.props.onRefresh(id);
  };

  handleCommitKey = () => {
    const { onCommit } = this.props;
    const { name, key } = this.state;

    const result: TApiKeyTableEntity = {
      key,
      name,
      id: generateId(),
      created: new Date(),
    };

    onCommit(result);
    this.setState({ name: '', key: '' });
  };
}

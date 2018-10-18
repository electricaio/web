import React, { Component, SFC, SyntheticEvent } from 'react';
import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { ActionButtons } from './action-buttons';
import { RefreshButton } from './action-buttons.css';
import {
  ActionCell,
  ActionHeader,
  Container,
  CreatedCell,
  CreatedHeader,
  FlexContainer,
  Inner,
  Input,
  KeyCell,
  KeyHeader,
  Padding,
  NameCell,
  NameHeader,
  StyledTable,
  Tr,
  TrHead,
} from './table.css';
import format = require('date-fns/format');

const generateId = () => Math.floor(Math.random() * 100000).toString();

const ComposedNameCell: SFC = ({ children }) => (
  <NameCell>
    <FlexContainer>
      <Padding />
      {children}
    </FlexContainer>
  </NameCell>
);

const ComposedActionCell: SFC = ({ children }) => (
  <ActionCell>
    <FlexContainer>
      {children}
      <Padding />
    </FlexContainer>
  </ActionCell>
);

export const Thead: SFC = () => (
  <thead>
    <TrHead>
      <NameHeader>
        <FlexContainer>
          <Padding />
          Name
        </FlexContainer>
      </NameHeader>
      <KeyHeader>Key</KeyHeader>
      <CreatedHeader>Date Created</CreatedHeader>
      <ActionHeader>
        <FlexContainer justify={'center'}>
          Action
          <Padding />
        </FlexContainer>
      </ActionHeader>
      <th />
    </TrHead>
  </thead>
);

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
            <Thead />
            <tbody>
              {data.map(el => (
                <Tr key={el.id}>
                  <ComposedNameCell>{el.name}</ComposedNameCell>
                  <KeyCell>{el.key}</KeyCell>
                  <CreatedCell>{format(el.created, 'DD/MM/YY')}</CreatedCell>
                  <ComposedActionCell>
                    <ActionButtons
                      onRemove={this.handleRemove(el.id)}
                      onRefresh={this.handleRefresh(el.id)}
                    />
                  </ComposedActionCell>
                  <td />
                </Tr>
              ))}
              {isNewEntity && (
                <Tr>
                  <ComposedNameCell>
                    <Input onBlur={this.handleNameUpdate} />
                  </ComposedNameCell>
                  <KeyCell>
                    <Input onBlur={this.handleKeyUpdate} />
                  </KeyCell>
                  <CreatedCell>{format(new Date(), 'DD/MM/YY')}</CreatedCell>
                  <ComposedActionCell>
                    <RefreshButton onClick={this.handleCommitKey}>Add</RefreshButton>
                  </ComposedActionCell>
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

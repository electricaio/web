import React, { Component, SFC } from 'react';
import { Input, Modal, Table } from 'antd';
import { ActionButtons } from './action-buttons';
import { format } from 'date-fns';
import { CopyKeyButton, StyledEye, KeyContainer, MaskStyle } from './table.css';
import { ApiKeyModal, ApiHiddenKeyModal } from '../../../../redux/api-keys/types';

const { TextArea } = Input;

type TDateProps = {
  date: string;
};

export const Date: SFC<TDateProps> = ({ date }) => <div>{format(date, 'DD.MM.YYYY')}</div>;

export type TTableProps = {
  data: ApiKeyModal[];
  hiddenKey: ApiHiddenKeyModal;
  onRemove: (id: number) => void;
  onRefresh: (id: number) => void;
  getKey: (id: number) => void;
};

type TKeyVisibilityState = {
  showKey: boolean;
};

export class ApiKeysTable extends Component<TTableProps, TKeyVisibilityState> {
  readonly state: TKeyVisibilityState = {
    showKey: false,
  };

  handleRemove = (id: number) => () => {
    this.props.onRemove(id);
  };

  handleRefresh = (id: number) => () => {
    this.props.onRefresh(id);
  };

  handleCopyKey = () => {
    const textarea = document.getElementById('key-textarea') as HTMLInputElement;
    textarea.select();
    document.execCommand('copy');
  };

  handleShowKey = (id: number) => {
    this.setState(
      {
        showKey: true,
      },
      () => {
        this.props.getKey(id);
      }
    );
  };

  handleCloseModal = () => {
    this.setState({ showKey: false });
  };

  getColumns() {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Key',
        key: 'key',
        width: '35%',
        render: (entity: ApiKeyModal) => (
          <KeyContainer>
            {'********'}
            <StyledEye
              onClick={() => {
                this.handleShowKey(entity.id);
              }}
              type="eye"
            />
          </KeyContainer>
        ),
      },
      {
        title: 'Date Created',
        key: 'created',
        render: (entity: ApiKeyModal) => <Date date={entity.createdAt} />,
      },
      {
        title: 'Action',
        key: 'action',
        render: (entity: ApiKeyModal) => (
          <ActionButtons
            name={entity.name}
            onRemove={this.handleRemove(entity.id)}
            onRefresh={this.handleRefresh(entity.id)}
          />
        ),
      },
    ];
  }

  render() {
    const { data, hiddenKey } = this.props;
    const columns = this.getColumns();
    const dataSource = data.map(obj => ({ ...obj, key: obj.name }));
    return (
      <div>
        <Table pagination={false} columns={columns} dataSource={dataSource} />
        {this.state.showKey && (
          <Modal
            visible={this.state.showKey}
            title={''}
            closable={false}
            onCancel={this.handleCloseModal}
            maskStyle={MaskStyle}
            centered
            width={700}
            footer={
              document.queryCommandSupported('copy') && (
                <CopyKeyButton size="large" type="default" onClick={this.handleCopyKey}>
                  {'Copy Key'}
                </CopyKeyButton>
              )
            }
          >
            <TextArea autosize value={hiddenKey && hiddenKey.key} id="key-textarea" />
          </Modal>
        )}
      </div>
    );
  }
}

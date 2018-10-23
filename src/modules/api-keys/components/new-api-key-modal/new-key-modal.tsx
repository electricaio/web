import { TApiKeyTableEntity } from '../../../../models/ApiKeyTableEntity';
import { NewApiButton } from './new-key-modal.css';
import React, { Component, Fragment } from 'react';

import { MainModal } from '../../../../components/modal';
import { ApiKeyForm } from '../api-key-form/api-key-form';

export type TApiKeysProps = {
  onCommit: (entity: TApiKeyTableEntity) => void;
};

export type TApiKeysState = {
  visible: boolean;
};

export class NewKeyModal extends Component<TApiKeysProps, TApiKeysState> {
  formRef: any = null;

  readonly state: TApiKeysState = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    const form = this.formRef.props.form;
    form.resetFields();

    this.setState({
      visible: false,
    });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err: string, values: object) => {
      if (err) {
        return;
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    return (
      <Fragment>
        <MainModal
          submitText="Create"
          title="Generate New API"
          visible={visible}
          handleCancel={this.closeModal}
          handleSave={this.handleCreate}
        >
          <ApiKeyForm wrappedComponentRef={this.saveFormRef} />
        </MainModal>
        <NewApiButton type="primary" onClick={this.showModal}>
          Generate New API Key
        </NewApiButton>
      </Fragment>
    );
  }

  handleCommit = (el: TApiKeyTableEntity) => {
    const { onCommit } = this.props;

    onCommit(el);
  };
}

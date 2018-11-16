import React, { Component, Fragment, ReactElement } from 'react';

import { MainModal } from '../../../../components/modal';
import { ApiKeyForm } from '../api-key-form/api-key-form';

export type TApiKeysProps = {
  onCommit: (param: any) => void;
  submitText: string;
  title: string;
  children: ReactElement<any>;
  name?: string;
  userId: number;
};

export type TApiKeysState = {
  visible: boolean;
};

type FormFields = {
  apiKeyName: string;
};

export class ButtonActionModal extends Component<TApiKeysProps, TApiKeysState> {
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
    form.validateFields((err: string, values: FormFields) => {
      if (err) {
        return;
      }
      form.resetFields();
      const param = {
        name: values.apiKeyName,
        userId: this.props.userId,
      };
      this.props.onCommit(param);
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    const { title, submitText, children, name } = this.props;
    return (
      <Fragment>
        <MainModal
          submitText={submitText}
          title={title}
          visible={visible}
          handleCancel={this.closeModal}
          handleSave={this.handleCreate}
        >
          <ApiKeyForm apiKeyName={name} wrappedComponentRef={this.saveFormRef} />
        </MainModal>
        {React.cloneElement(children, {
          onClick: this.showModal,
        })}
      </Fragment>
    );
  }
}

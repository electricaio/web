import React, { Component, Fragment, ReactElement } from 'react';

import { MainModal } from '../../../../components/modal';
import { ConnectionModal } from '../../../../redux/connections/types';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { ConnectionForm } from '../connection-form/connection-form';

export type TConnectionsProps = {
  onCommit: (connection: ConnectionModal) => void;
  submitText: string;
  title: string;
  children: ReactElement<any>;
  name?: string;
  accessKeyId?: number;
  connectorId?: number;
  authorizationType?: string;
  accessKeys?: ApiKeyModal[];
};

export type TConnectionsState = {
  visible: boolean;
};

type FormFields = {
  connectionName: string;
  accessKeyId: number;
};

export class ButtonActionModal extends Component<TConnectionsProps, TConnectionsState> {
  formRef: any = null;

  readonly state: TConnectionsState = {
    visible: false,
  };

  showModal = () => {
    this.setState({ 
      visible: true ,
    });
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

      this.props.onCommit({ 
        name: values.connectionName,
        accessKeyId: values.accessKeyId,
        connectorId: this.props.connectorId,
      });
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    const { title, submitText, children, name, accessKeyId, authorizationType, accessKeys } = this.props;
    return (
      <Fragment>
        <MainModal
          submitText={submitText}
          title={title}
          visible={visible}
          handleCancel={this.closeModal}
          handleSave={this.handleCreate}
        >
          <ConnectionForm 
            connectionName={name}
            accessKeys={accessKeys}
            accessKeyId={accessKeyId}
            authorizationType={authorizationType}
            wrappedComponentRef={this.saveFormRef} 
          />
        </MainModal>
        {React.cloneElement(children, {
          onClick: this.showModal,
        })}
      </Fragment>
    );
  }
}

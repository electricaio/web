import React, { Component, Fragment, ReactElement } from 'react';
import { MainModal } from '../../../components/modal';

export type TConnectionsProps = {
  onCommit: (values: any) => void;
  submitText: string;
  title: string;
  children: ReactElement<any>;
  formComponent: ReactElement<any>;
};

export type TConnectionsState = {
  visible: boolean;
};

export class ButtonActionModal extends Component<TConnectionsProps, TConnectionsState> {
  formRef: any = null;

  readonly state: TConnectionsState = {
    visible: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  closeModal = () => {
    if (this.formRef) {
      const form = this.formRef.props.form;
      form.resetFields();
    }

    this.setState({
      visible: false,
    });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;

    form.validateFields((err: string, values: any) => {
      if (err) {
        return;
      }
      form.resetFields();

      this.props.onCommit(values);
      this.setState({ visible: false });
    });
  };

  saveFormRef = (formRef: any) => {
    this.formRef = formRef;
  };

  render() {
    const { visible } = this.state;
    const { title, submitText, children, formComponent } = this.props;
    return (
      <Fragment>
        <MainModal
          submitText={submitText}
          title={title}
          visible={visible}
          handleCancel={this.closeModal}
          handleSave={this.handleCreate}
        >
          {React.cloneElement(formComponent, {
            wrappedComponentRef: this.saveFormRef,
          })}
        </MainModal>
        {React.cloneElement(children, {
          onClick: this.showModal,
        })}
      </Fragment>
    );
  }
}

import React, { Component } from 'react';
import { Modal, Button } from 'antd';

export type TModel = {
  visible: boolean;
  handleSave: (e: React.MouseEvent<any>) => void;
  handleCancel: (e: React.MouseEvent<any>) => void;
  title: string;
  submitText: string;
};
export class MainModal extends Component<TModel> {
  render() {
    const { visible, handleSave, handleCancel, title, children, submitText } = this.props;
    return (
      <Modal
        visible={visible}
        title={title}
        onOk={handleSave}
        onCancel={handleCancel}
        footer={[
          <Button size="large" key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button htmlType="submit" size="large" key="submit" type="primary" onClick={handleSave}>
            {submitText}
          </Button>,
        ]}
      >
        {children}
      </Modal>
    );
  }
}

import React, { Component } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

interface ConnectionComponentProps extends FormComponentProps {
  connectionName?: string;
}

class ConnectionFormComponent extends Component<ConnectionComponentProps> {
  render() {
    const {
      connectionName,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('connectionName', {
            initialValue: connectionName,
            rules: [{ required: true, message: 'Please input a name for this connection' }],
          })(<StyledInput placeholder="Connection Name" />)}
        </FormItem>
      </Form>
    );
  }
}

export const ConnectionForm = Form.create()(ConnectionFormComponent);

import React, { Component } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

interface ApiKeyFormComponentProps extends FormComponentProps {
  apiKeyName?: string;
}

class ApiKeyFormComponent extends Component<ApiKeyFormComponentProps> {
  render() {
    const {
      apiKeyName,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('apiKeyName', {
            initialValue: apiKeyName,
            rules: [{ required: true, message: 'Please input a name for this key' }],
          })(<StyledInput placeholder="e.g. Production" />)}
        </FormItem>
      </Form>
    );
  }
}

export const ApiKeyForm = Form.create()(ApiKeyFormComponent);

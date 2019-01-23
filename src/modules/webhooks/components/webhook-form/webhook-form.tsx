import React, { Component } from 'react';
import { Form, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

class WebhookFormComponent extends Component<FormComponentProps> {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name for this webhook' }],
          })(<StyledInput placeholder="Webhook Name" />)}
        </FormItem>
        <FormItem>{getFieldDecorator('isPublic', {})(<Checkbox>Public Access</Checkbox>)}</FormItem>
      </Form>
    );
  }
}

export const WebhookForm = Form.create()(WebhookFormComponent);

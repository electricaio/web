import React, { Component } from 'react';
import { Form } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

interface AccessKeyFormComponentProps extends FormComponentProps {
  name?: string;
}

class AccessKeyFormComponent extends Component<AccessKeyFormComponentProps> {
  render() {
    const {
      name,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            initialValue: name,
            rules: [{ required: true, message: 'Please input a name for this key' }],
          })(<StyledInput placeholder="e.g. Production" />)}
        </FormItem>
      </Form>
    );
  }
}

export const AccessKeyForm = Form.create()(AccessKeyFormComponent);

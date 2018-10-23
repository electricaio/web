import React, { Component, SFC } from 'react';
import { Form, Icon, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { GenerateKeyContainer, GenerateButton, StyledFormItem } from './api-key-form.css';
import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

class ApiKeyFormComponent extends Component<FormComponentProps> {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input a name for this key' }],
          })(<StyledInput placeholder="e.g. Production" />)}
        </FormItem>
        <GenerateNewKey form={this.props.form} />
      </Form>
    );
  }
}

export const GenerateNewKey: SFC<FormComponentProps> = ({ form: { getFieldDecorator } }) => (
  <GenerateKeyContainer>
    <StyledFormItem>
      {getFieldDecorator('apiKey', {
        rules: [{ required: true, message: 'Please generate an API key' }],
      })(<StyledInput prefix={<Icon type="key" />} />)}
    </StyledFormItem>

    <Tooltip placement="left" title="Click to generate a new API Key">
      <GenerateButton type="primary" shape="circle" icon="sync" />
    </Tooltip>
  </GenerateKeyContainer>
);

export const ApiKeyForm = Form.create()(ApiKeyFormComponent);

import React, { Component, SFC } from 'react';
import { Form, Icon, Tooltip } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { GenerateKeyContainer, GenerateButton, StyledFormItem } from './api-key-form.css';
import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;

interface ApiKeyFormComponentProps extends FormComponentProps {
  apiKeyName?: string;
  apiKey?: string;
}

class ApiKeyFormComponent extends Component<ApiKeyFormComponentProps> {
  render() {
    const {
      apiKeyName,
      apiKey,
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
        <GenerateNewKey apiKey={apiKey} form={this.props.form} />
      </Form>
    );
  }
}

interface GenerateNewKeyProps extends FormComponentProps {
  apiKey?: string;
}

export const GenerateNewKey: SFC<GenerateNewKeyProps> = ({
  apiKey,
  form: { getFieldDecorator },
}) => (
  <GenerateKeyContainer>
    <StyledFormItem>
      {getFieldDecorator('apiKey', {
        initialValue: apiKey,
        rules: [{ required: true, message: 'Please generate an API key' }],
      })(<StyledInput prefix={<Icon type="key" />} />)}
    </StyledFormItem>

    <Tooltip placement="left" title="Click to generate a new API Key">
      <GenerateButton type="primary" shape="circle" icon="sync" />
    </Tooltip>
  </GenerateKeyContainer>
);

export const ApiKeyForm = Form.create()(ApiKeyFormComponent);

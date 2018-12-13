import React, { Component, Fragment } from 'react';
import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { StyledInput } from '../../../ui-kit/input';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { SelectProps } from 'antd/lib/select';

const FormItem = Form.Item;
const Option = Select.Option;

interface ConnectionComponentProps extends FormComponentProps {
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
}

interface SelectAccessKeysProps extends SelectProps {
  accessKeys: ApiKeyModal[];
}

export class SelectAccessKeys extends Component<SelectAccessKeysProps> {
  render() {
    const { accessKeys, onChange, value } = this.props;
    return (
      <Select size="large" onChange={onChange} value={value} placeholder="Select an Access Key">
        {accessKeys.map((eachKey: ApiKeyModal) => (
          <Option key={eachKey.id.toString()} value={eachKey.id}>
            {eachKey.name}
          </Option>
        ))}
      </Select>
    );
  }
}

class ConnectionFormComponent extends Component<ConnectionComponentProps> {
  render() {
    const {
      accessKeys,
      connector,
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('connectionName', {
            rules: [{ required: true, message: 'Please input a name for this connection' }],
          })(<StyledInput placeholder="Connection Name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('accessKeyId', {
            rules: [{ required: true, message: 'Please select an access key', type: 'number' }],
          })(<SelectAccessKeys accessKeys={accessKeys} />)}
        </FormItem>
        {connector.authorizationType === 'Basic' && (
          <Fragment>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input username' }],
              })(<StyledInput placeholder="User Name" />)}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input password' }],
              })(<StyledInput placeholder="Password" />)}
            </FormItem>
          </Fragment>
        )}
        {connector.authorizationType === 'Token' && (
          <FormItem>
            {getFieldDecorator('token', {
              rules: [{ required: true, message: `Please input your ${connector.name} token` }],
            })(<StyledInput placeholder="Token" />)}
          </FormItem>
        )}
      </Form>
    );
  }
}

export const ConnectionForm = Form.create()(ConnectionFormComponent);
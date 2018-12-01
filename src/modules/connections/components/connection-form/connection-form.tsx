import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { StyledInput } from '../../../ui-kit/input';

const FormItem = Form.Item;
const Option = Select.Option;

interface ConnectionComponentProps extends FormComponentProps {
  connectionName?: string;
  accessKeyId?: number;
  authorizationType: string;
  accessKeys: ApiKeyModal[];
  username?: string;
  password?: string;
  token?: string;
}

class ConnectionFormComponent extends Component<ConnectionComponentProps> {
  render() {
    const {
      connectionName,
      authorizationType,
      accessKeys,
      // accessKeyId,
      username,
      password,
      token,
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
        <FormItem>
          {getFieldDecorator('accessKeyId', {
            initialValue: "123",
            rules: [
              { required: true, message: 'Please select an access key', type: 'number' },
            ],
          })(
              <Select>
                { accessKeys.map(eachKey => <Option value={eachKey.key}>{eachKey.name}</Option>) }
              </Select>
            )}
        </FormItem>
        {
          authorizationType === 'Basic' &&
          <FormItem>
            {getFieldDecorator('username', {
              initialValue: username,
              rules: [{ required: true, message: 'Please input username' }],
            })(<StyledInput placeholder="User Name" />)}
          </FormItem>
        }
        {
          authorizationType === 'Basic' &&
          <FormItem>
            {getFieldDecorator('password', {
              initialValue: password,
              rules: [{ required: true, message: 'Please input password' }],
            })(<StyledInput placeholder="Password" />)}
          </FormItem>
        }
        {
          authorizationType === 'Token' &&
          <FormItem>
            {getFieldDecorator('token', {
              initialValue: token,
              rules: [{ required: true, message: 'Please input token' }],
            })(<StyledInput placeholder="Token" />)}
          </FormItem>
        }
      </Form>
    );
  }
}

export const ConnectionForm = Form.create()(ConnectionFormComponent);

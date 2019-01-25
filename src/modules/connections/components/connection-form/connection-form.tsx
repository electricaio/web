import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { StyledInput } from '../../../ui-kit/input';
import { ConnectorModal } from '../../../../redux/connector-hub/types';
import { SelectProps } from 'antd/lib/select';
import { PropertiesForm, Properties } from '../../../../components/properties-form/properties-form';
import { AuthorizationType } from '../../../../redux/connections/types';
import { AuthFormFactory } from './authorizations/components/factory';

const FormItem = Form.Item;
const Option = Select.Option;

interface ConnectionComponentProps extends FormComponentProps {
  connector: ConnectorModal;
  accessKeys: ApiKeyModal[];
  inEditMode?: boolean;
  defaultFormValues?: DefaultFormValues;
}

export type DefaultFormValues = {
  connectionName: string;
  accessKeyId: number;
  properties: Properties[];
  authorization: AuthorizationType;
};

interface SelectAccessKeysProps extends SelectProps {
  accessKeys: ApiKeyModal[];
}

interface DefaultProps {
  defaultFormValues: DefaultFormValues;
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
  static defaultProps: DefaultProps = {
    defaultFormValues: {
      connectionName: '',
      accessKeyId: undefined,
      properties: [],
      authorization: {
        id: 0,
        password: '',
        username: '',
        token: '',
        clientId: '',
        integrationId: '',
      },
    },
  };
  render() {
    const {
      accessKeys,
      connector,
      defaultFormValues,
      form: { getFieldDecorator },
      inEditMode = false,
    } = this.props;

    return (
      <Form>
        <FormItem>
          {getFieldDecorator('connectionName', {
            initialValue: defaultFormValues.connectionName,
            rules: [{ required: true, message: 'Please input a name for this connection' }],
          })(<StyledInput placeholder="Connection Name" />)}
        </FormItem>
        {!inEditMode && (
          <FormItem>
            {getFieldDecorator('accessKeyId', {
              initialValue: defaultFormValues.accessKeyId,
              rules: [{ required: true, message: 'Please select an access key', type: 'number' }],
            })(<SelectAccessKeys accessKeys={accessKeys} />)}
          </FormItem>
        )}
        <AuthFormFactory
          defaultFormValues={defaultFormValues}
          authType={connector.authorizationType}
          getFieldDecorator={getFieldDecorator}
          connector={connector}
        />
        <FormItem>
          {getFieldDecorator('properties', {
            initialValue: defaultFormValues.properties,
          })(<PropertiesForm />)}
        </FormItem>
      </Form>
    );
  }
}

export const ConnectionForm = Form.create()(ConnectionFormComponent);

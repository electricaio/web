import React, { SFC } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { StyledInput } from '../../../../../ui-kit/input';
import { AuthFormProps } from './factory';

export const TokenForm: SFC<AuthFormProps> = ({
  getFieldDecorator,
  defaultFormValues,
  connector,
}) => {
  return (
    <FormItem>
      {getFieldDecorator('token', {
        initialValue: defaultFormValues.authorization.token,
        rules: [{ required: true, message: `Please input your ${connector.name} token` }],
      })(<StyledInput placeholder="Token" />)}
    </FormItem>
  );
};

import React, { Fragment, SFC } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { StyledInput } from '../../../../../ui-kit/input';
import { AuthFormProps } from './factory';

export const BasicForm: SFC<AuthFormProps> = ({ getFieldDecorator, defaultFormValues }) => {
  return (
    <Fragment>
      <FormItem>
        {getFieldDecorator('username', {
          initialValue: defaultFormValues.authorization,
          rules: [{ required: true, message: 'Please input username' }],
        })(<StyledInput placeholder="User Name" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          initialValue: defaultFormValues.authorization.password,
          rules: [{ required: true, message: 'Please input password' }],
        })(<StyledInput placeholder="Password" />)}
      </FormItem>
    </Fragment>
  );
};

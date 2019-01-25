import React, { Fragment, SFC } from 'react';
import FormItem from 'antd/lib/form/FormItem';
import { StyledInput } from '../../../../../ui-kit/input';
import { AuthFormProps } from './factory';

export const IbmForm: SFC<AuthFormProps> = ({ getFieldDecorator, defaultFormValues }) => {
  return (
    <Fragment>
      <FormItem>
        {getFieldDecorator('integrationId', {
          initialValue: defaultFormValues.authorization.id,
          rules: [{ required: true, message: 'Please enter an Integration ID' }],
        })(<StyledInput placeholder="Integration ID" />)}
      </FormItem>
      <FormItem>
        {getFieldDecorator('clientId', {
          initialValue: defaultFormValues.authorization.clientId,
          rules: [{ required: true, message: 'Please enter a Client ID' }],
        })(<StyledInput placeholder="Client ID" />)}
      </FormItem>
    </Fragment>
  );
};

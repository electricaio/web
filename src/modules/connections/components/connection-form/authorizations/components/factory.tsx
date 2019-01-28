import React, { SFC } from 'react';
import { ConnectorModal } from '../../../../../../redux/api-hub/types';
import { DefaultFormValues } from '../../connection-form';
import { TokenForm } from './token';
import { BasicForm } from './basic';
import { IbmForm } from './ibm';

export interface AuthFormProps {
  connector: ConnectorModal;
  defaultFormValues?: DefaultFormValues;
  getFieldDecorator: any;
}

export interface AuthFormFactoryProps {
  authType: string;
}

export const AuthFormFactory: SFC<AuthFormFactoryProps & AuthFormProps> = ({
  connector,
  defaultFormValues,
  getFieldDecorator,
}) => {
  switch (connector.authorizationType.toLowerCase()) {
    case 'basic':
      return (
        <BasicForm
          connector={connector}
          getFieldDecorator={getFieldDecorator}
          defaultFormValues={defaultFormValues}
        />
      );
    case 'token':
      return (
        <TokenForm
          getFieldDecorator={getFieldDecorator}
          connector={connector}
          defaultFormValues={defaultFormValues}
        />
      );
    case 'ibm':
      return (
        <IbmForm
          connector={connector}
          getFieldDecorator={getFieldDecorator}
          defaultFormValues={defaultFormValues}
        />
      );
    default:
      return <span />;
  }
};

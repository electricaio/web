import React from 'react';
import { shallow } from 'enzyme';
import { AuthFormFactory } from '../factory';
import { BASIC_AUTH, TOKEN_AUTH, IBM_AUTH } from '../../auth_types';
import { BasicForm } from '../basic';
import { TokenForm } from '../token';
import { IbmForm } from '../ibm';

describe('Authorization Factory', () => {
  let getFieldDecoratorMock: jest.Mock;
  let defaultFormValuesMock: any;

  beforeEach(() => {
    getFieldDecoratorMock = jest.fn();
    defaultFormValuesMock = jest.fn();
  });

  const createConnector = (authType: string) => {
    return {
      typeId: 1,
      authorizationType: authType,
      name: 'SalesForce CRM API 2.0',
      resource: 'customer',
      version: '2.0',
      namespace: 'salesforce',
      id: 4,
      ern: 'ern://salesforce:customer:2_0',
      revisionVersion: 0,
    };
  };
  describe('basic', () => {
    const connectorBasic = createConnector(BASIC_AUTH);
    beforeEach(() => {
      this.factory = shallow(
        <AuthFormFactory
          connector={connectorBasic}
          getFieldDecorator={getFieldDecoratorMock}
          authType={BASIC_AUTH}
          defaultFormValues={defaultFormValuesMock}
        />
      );
    });

    it('renders when auth type is passed', () => {
      expect(this.factory.find(BasicForm)).toHaveLength(1);
    });

    it('passes getFieldDecorator, defaultFormValues and connector props', () => {
      const basicComponent = this.factory.find(BasicForm);
      expect(basicComponent.prop('getFieldDecorator')).toEqual(getFieldDecoratorMock);
      expect(basicComponent.prop('defaultFormValues')).toEqual(defaultFormValuesMock);
      expect(basicComponent.prop('connector')).toEqual(connectorBasic);
    });
  });
  describe('token', () => {
    const tokenConnector = createConnector(TOKEN_AUTH);
    beforeEach(() => {
      this.factory = shallow(
        <AuthFormFactory
          connector={tokenConnector}
          getFieldDecorator={getFieldDecoratorMock}
          authType={TOKEN_AUTH}
          defaultFormValues={defaultFormValuesMock}
        />
      );
    });

    it('renders when auth type is passed', () => {
      expect(this.factory.find(TokenForm)).toHaveLength(1);
    });

    it('passes getFieldDecorator, defaultFormValues and connector props', () => {
      const basicComponent = this.factory.find(TokenForm);
      expect(basicComponent.prop('getFieldDecorator')).toEqual(getFieldDecoratorMock);
      expect(basicComponent.prop('defaultFormValues')).toEqual(defaultFormValuesMock);
      expect(basicComponent.prop('connector')).toEqual(tokenConnector);
    });
  });

  describe('ibm', () => {
    const ibmConnector = createConnector(IBM_AUTH);
    beforeEach(() => {
      this.factory = shallow(
        <AuthFormFactory
          connector={ibmConnector}
          getFieldDecorator={getFieldDecoratorMock}
          authType={IBM_AUTH}
          defaultFormValues={defaultFormValuesMock}
        />
      );
    });

    it('renders when auth type is passed', () => {
      expect(this.factory.find(IbmForm)).toHaveLength(1);
    });

    it('passes getFieldDecorator, defaultFormValues and connector props', () => {
      const basicComponent = this.factory.find(IbmForm);
      expect(basicComponent.prop('getFieldDecorator')).toEqual(getFieldDecoratorMock);
      expect(basicComponent.prop('defaultFormValues')).toEqual(defaultFormValuesMock);
      expect(basicComponent.prop('connector')).toEqual(ibmConnector);
    });
  });
});

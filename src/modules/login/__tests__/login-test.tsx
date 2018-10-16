import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';

import Login from '../index';
import Header from '../../../components/header';

describe('Login', () => {
  let loginComponent: any;

  beforeEach(() => {
    loginComponent = mount(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  it('should contain a header with a title', () => {
    const header = loginComponent.find(Header);
    expect(header.prop('title')).toBeTruthy();
  });

  it('should call a handle submit function when form is submitted', () => {});

  it('should have a username input', () => {
    const username = loginComponent.find('input#username');
    expect(username).toHaveLength(1);
  });

  it('should have a password input', () => {
    const password = loginComponent.find('input#password');
    expect(password).toHaveLength(1);
  });

  function populateInputsAndSubmit(inputsToPopulate: string[] = []) {
    inputsToPopulate.forEach((componentName) => {
      const component = loginComponent.find(componentName);
      component.simulate('change', { target: { value: 'testing' } });
    });
    const form = loginComponent.find(Form);
    form.simulate('submit');
    return loginComponent.find('.ant-form-explain');
  }

  it('should not fail if username and password fields are completed', () => {
    expect(populateInputsAndSubmit(['input#password', 'input#username'])).toHaveLength(0);
  });

  it('should show validation error components for missing password and username', () => {
    expect(populateInputsAndSubmit()).toHaveLength(2);
  });

  it('should validate an error if there is no username', () => {
    const errorComponents = populateInputsAndSubmit(['input#password']);
    expect(errorComponents).toHaveLength(1);
    expect(errorComponents.text()).toBeTruthy();
  });

  it('should validate an error if there is no password', () => {
    const errorComponents = populateInputsAndSubmit(['input#username']);
    expect(errorComponents).toHaveLength(1);
    expect(errorComponents.text()).toBeTruthy();
  });
});

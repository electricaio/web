import React from 'react';
import { mount } from 'enzyme';
import { Form } from 'antd';
import { MemoryRouter } from 'react-router-dom';
import { LoginFormComponent as Login } from '../login';
import { Header } from '../../../components/header';

describe('Login', () => {
  beforeEach(() => {
    this.loginComponent = mount(
      <MemoryRouter>
        <Login login={jest.fn()} />
      </MemoryRouter>
    );
  });

  it('should contain a header with a title', () => {
    const header = this.loginComponent.find(Header);
    expect(header.prop('title')).toBeTruthy();
  });

  it('should have a username input', () => {
    const username = this.loginComponent.find('input#username');
    expect(username).toHaveLength(1);
  });

  it('should have a password input', () => {
    const password = this.loginComponent.find('input#password');
    expect(password).toHaveLength(1);
  });

  const populateInputsAndSubmit = (inputsToPopulate: string[] = []) => {
    inputsToPopulate.forEach(componentName => {
      const component = this.loginComponent.find(componentName);
      component.simulate('change', { target: { value: 'testing' } });
    });
    const form = this.loginComponent.find(Form);
    form.simulate('submit');
    return this.loginComponent.find('.ant-form-explain');
  };

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

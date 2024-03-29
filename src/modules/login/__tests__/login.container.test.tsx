import React from 'react';
import { mount } from 'enzyme';
import { LoginComponent } from '../container/login.container';
import { Spin } from 'antd';
import { LoginFormComponent } from '../login';
import { MemoryRouter } from 'react-router-dom';

const antd = require.requireActual('antd');

describe('LoginContainer', () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    this.loginContainer = mountComponent();
  });

  const mountComponent = (props = {}) => {
    return mount(
      <MemoryRouter>
        <LoginComponent loading login={loginMock} {...props} />
      </MemoryRouter>
    );
  };

  it('renders an error when error state is populated', () => {
    const errorMock = jest.fn();
    antd.message.error = errorMock;

    mountComponent({ errors: 'oh no!' });
    expect(errorMock).toBeCalled();
  });

  it('sets loading property on Spin component', () => {
    expect(this.loginContainer.find(Spin).prop('spinning')).toBeTruthy();
  });

  it('renders login component with Spin component', () => {
    expect(this.loginContainer.find(Spin).find(LoginFormComponent)).toHaveLength(1);
  });

  it('passes login action to login component', () => {
    expect(this.loginContainer.find(LoginFormComponent).prop('login')).toEqual(loginMock);
  });
});

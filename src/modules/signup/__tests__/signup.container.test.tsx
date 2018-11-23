import React from 'react';
import { mount } from 'enzyme';
import { SignupComponent } from '../container/signup.container';
import { Spin } from 'antd';
import { SignupFormComponent } from '../';
import { MemoryRouter } from 'react-router-dom';

const antd = require.requireActual('antd');

describe('SignupContainer', () => {
  const signupMock = jest.fn();

  beforeEach(() => {
    this.signupContainer = mountComponent();
  });

  const mountComponent = (props = {}) => {
    return mount(
      <MemoryRouter>
        <SignupComponent loading signup={signupMock} {...props} />
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
    expect(this.signupContainer.find(Spin).prop('spinning')).toBeTruthy();
  });

  it('renders signup component with Spin component', () => {
    expect(this.signupContainer.find(Spin).find(SignupFormComponent)).toHaveLength(1);
  });

  it('passes signup action to signup component', () => {
    expect(
      this.signupContainer
        .find(Spin)
        .find(SignupFormComponent)
        .prop('signup')
    ).toEqual(signupMock);
  });
});

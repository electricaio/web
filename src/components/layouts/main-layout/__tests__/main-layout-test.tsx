import React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import { MainLayout } from '../main-layout';
import { Header } from '../main-layout.css';
import { UserDto } from '../../../../redux/auth/types';

const { Content } = Layout;

describe('Main Layout', () => {
  const TestContentComponent = () => <div>content</div>;
  const fetchUserDetailsMock = jest.fn();

  beforeEach(() => {
    const user: UserDto = {
      id: 1,
      organizationId: 1,
      firstName: 'chris',
      lastName: 'McCaw',
      email: 'admin@electrica.io',
    };

    this.mainComponent = shallow(
      <MainLayout errorMessage="" user={user} fetchUserDetails={fetchUserDetailsMock}>
        <TestContentComponent />
      </MainLayout>
    );
  });

  it('contains a header', () => {
    expect(this.mainComponent.find(Header)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(this.mainComponent.find(Content)).toHaveLength(1);
  });

  it('calls fetchUserDetails on mount', () => {
    expect(fetchUserDetailsMock).toBeCalled();
  });

  it('renders children if user has been loaded', () => {
    expect(this.mainComponent.find(TestContentComponent)).toHaveLength(1);
  });

  it('does not render children if user id is not defiend', () => {
    const user: UserDto = {
      id: null,
      organizationId: null,
      firstName: null,
      lastName: null,
      email: null,
    };
    const noUserComponent = shallow(
      <MainLayout errorMessage="" user={user} fetchUserDetails={fetchUserDetailsMock}>
        <TestContentComponent />
      </MainLayout>
    );
    expect(noUserComponent.find(TestContentComponent)).toHaveLength(0);
  });
});

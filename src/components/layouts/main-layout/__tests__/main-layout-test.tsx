import React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import { MainLayout } from '../main-layout';
import { Header } from '../main-layout.css';
import { UserDto } from '../../../../redux/auth/types';
import { AsyncComponent } from '../../../async-component/async-component';

const { Content } = Layout;

describe('Main Layout', () => {
  const TestContentComponent = () => <div>content</div>;
  const fetchUserMock = jest.fn();

  beforeEach(() => {
    const user: UserDto = {
      id: 1,
      organizationId: 1,
      firstName: 'chris',
      lastName: 'McCaw',
      email: 'admin@electrica.io',
    };

    this.mainComponent = shallow(
      <MainLayout errorMessage="" user={user} fetchUser={fetchUserMock}>
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

  it('renders children if user has been loaded', () => {
    expect(this.mainComponent.find(TestContentComponent)).toHaveLength(1);
  });

  describe('async component', () => {
    it('renders the component', () => {
      expect(this.mainComponent.find(AsyncComponent)).toHaveLength(1);
    });

    it('show error should be false since we are redirecting to login screen on error anyway', () => {
      const showErrorProp = this.mainComponent.find(AsyncComponent).prop('showError');
      expect(showErrorProp).toEqual(false);
    });

    it('passes fetchConnectors action', () => {
      const actions = this.mainComponent.find(AsyncComponent).prop('getAsyncActions');
      actions();
      expect(fetchUserMock).toBeCalled();
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { BreadcrumbNavigation } from '../breadcrumb';
import { MemoryRouter } from 'react-router';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';
import * as H from 'history';

describe('Breadcrumb', () => {
  const breadcrumbMap = {
    '/connector-hub': 'Breadcrumb Test',
  };
  beforeEach(() => {
    const mock: any = jest.fn();
    const location: H.Location = {
      hash: '',
      key: '',
      pathname: '/connector-hub',
      search: '',
      state: {},
    };
    this.component = mount(
      <MemoryRouter>
        <BreadcrumbNavigation
          match={mock}
          location={location}
          history={mock}
          breadcrumbNameMap={breadcrumbMap}
        />
      </MemoryRouter>
    );
  });

  it('renders home on first breadcrumb', () => {
    const homeIcon = this.component
      .find(Breadcrumb.Item)
      .first()
      .find(Icon);
    expect(homeIcon).toHaveLength(1);
    expect(homeIcon.prop('type')).toEqual('home');
  });

  it('renders second breadcrumb', () => {
    const secondBreadcrumb = this.component.find(Breadcrumb.Item).at(1);
    const breadcrumbLink = secondBreadcrumb.find(Link);
    expect(breadcrumbLink.text()).toEqual('Breadcrumb Test');
    expect(breadcrumbLink.prop('to')).toEqual('/connector-hub');
  });
});

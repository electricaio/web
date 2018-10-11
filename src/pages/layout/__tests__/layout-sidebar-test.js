import React from 'react';
import { shallow } from 'enzyme';

import { Layout } from 'antd';
import Navigation from '../../../components/navigation/index';

import LayoutSidebar from '../layout-sidebar';

const { Header, Sider, Content } = Layout;

describe('Layout with Sidebar', () => {
  let layoutSidebar;

  function TestContentComponent() {
    return <div>content</div>;
  }

  function TestSidebarComponent() {
    return <div>content</div>;
  }
  beforeEach(() => {
    layoutSidebar = shallow(
      <LayoutSidebar sidebar={<TestSidebarComponent />}>
        <TestContentComponent />
      </LayoutSidebar>,
    );
  });

  it('contains a header', () => {
    expect(layoutSidebar.find(Header)).toHaveLength(1);
  });

  it('contains a Sidebar component', () => {
    expect(layoutSidebar.find(Sider)).toHaveLength(1);
  });

  it('creates a Sidebar component from a sidebar prop', () => {
    expect(layoutSidebar.find(Sider).find(TestSidebarComponent)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(layoutSidebar.find(Content)).toHaveLength(1);
  });

  it('contains a Content component with the children prop', () => {
    expect(layoutSidebar.find(Content).find(TestContentComponent)).toHaveLength(1);
  });

  describe('Header', () => {
    it('has navigation in the header', () => {
      expect(layoutSidebar.find(Header).find(Navigation)).toHaveLength(1);
    });

    it('contains a list of navigation items to render', () => {
      const header = layoutSidebar.find(Header).find(Navigation);
      expect(header.prop('items').length).toBeGreaterThan(0);
    });

    it('contains the logo', () => {
      expect(layoutSidebar.find(Header).find('.logo')).toHaveLength(1);
    });
  });
});

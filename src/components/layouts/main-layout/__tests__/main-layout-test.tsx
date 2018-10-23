import * as React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import { Navigation } from '../../../navigation';
import { MainLayout } from '..';
import { LayoutHeader, LayoutSider } from '../main-layout.css';

const { Content } = Layout;

describe('Layout with Sidebar', () => {
  const TestContentComponent = () => <div>content</div>;
  const TestSidebarComponent = () => <div>content</div>;

  beforeEach(() => {
    this.layoutSidebar = shallow(
      <MainLayout sidebar={<TestSidebarComponent />}>
        <TestContentComponent />
      </MainLayout>
    );
  });

  it('contains a header', () => {
    expect(this.layoutSidebar.find(LayoutHeader)).toHaveLength(1);
  });

  it('contains a Sidebar component', () => {
    expect(this.layoutSidebar.find(LayoutSider)).toHaveLength(1);
  });

  it('creates a Sidebar component from a sidebar prop', () => {
    expect(this.layoutSidebar.find(LayoutSider).find(TestSidebarComponent)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(this.layoutSidebar.find(Content)).toHaveLength(1);
  });

  it('contains a Content component with the children prop', () => {
    expect(this.layoutSidebar.find(Content).find(TestContentComponent)).toHaveLength(1);
  });

  describe('Header', () => {
    it('has navigation in the header', () => {
      expect(this.layoutSidebar.find(LayoutHeader).find(Navigation)).toHaveLength(1);
    });

    it('contains a list of navigation items to render', () => {
      const header = this.layoutSidebar.find(LayoutHeader).find(Navigation);
      expect(header.prop('items').length).toBeGreaterThan(0);
    });

    it('contains the logo', () => {
      expect(this.layoutSidebar.find(LayoutHeader).find('.logo')).toHaveLength(1);
    });
  });
});

import React from 'react';
import { Layout } from 'antd';
import { shallow } from 'enzyme';
import { Logo } from '../logo';
import { Navigation } from '../navigation';
import { MainLayout } from '..';
import { Header } from '../main-layout.css';

const { Content } = Layout;

describe('Layout with Sidebar', () => {
  const TestContentComponent = () => <div>content</div>;
  const TestSidebarComponent = () => <div>sidebar</div>;

  beforeEach(() => {
    this.layoutSidebar = shallow(
      <MainLayout sidebar={<TestSidebarComponent />}>
        <TestContentComponent />
      </MainLayout>
    );
  });

  it('contains a header', () => {
    expect(this.layoutSidebar.find(Header)).toHaveLength(1);
  });

  it('contains a Sidebar component', () => {
    expect(this.layoutSidebar.find(TestSidebarComponent)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(this.layoutSidebar.find(Content)).toHaveLength(1);
  });

  it('contains a Content component with the children prop', () => {
    expect(this.layoutSidebar.find(Content).find(TestContentComponent)).toHaveLength(1);
  });

  describe('Header', () => {
    it('has navigation in the header', () => {
      expect(this.layoutSidebar.find(Header).find(Navigation)).toHaveLength(1);
    });

    it('contains the logo', () => {
      expect(this.layoutSidebar.find(Header).find(Logo)).toHaveLength(1);
    });
  });
});

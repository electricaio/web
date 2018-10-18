import React, { SFC } from 'react';
import { shallow } from 'enzyme';
import { Layout } from 'antd';
import { Background } from '../layout-skewed-background/layout-skewed-background.css';
import { LayoutSkewedBackground } from '../layout-skewed-background';

const { Content } = Layout;

describe('Layout with Skewed Background', () => {
  const TestContentComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    this.layoutSidebar = shallow(
      <LayoutSkewedBackground>
        <TestContentComponent />
      </LayoutSkewedBackground>
    );
  });

  it('contains a background', () => {
    expect(this.layoutSidebar.find(Background)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(this.layoutSidebar.find(Content)).toHaveLength(1);
  });

  it('contains a Content component with the children prop', () => {
    expect(this.layoutSidebar.find(Content).find(TestContentComponent)).toHaveLength(1);
  });
});

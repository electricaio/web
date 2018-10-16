import React, { SFC } from 'react';
import { shallow } from 'enzyme';

import { Layout } from 'antd';
import { Background } from '../layout-skewed-background/layout-skewed-background.css';

import LayoutWithBG from '../layout-skewed-background';

const { Content } = Layout;

describe('Layout with Skewed Background', () => {
  let layoutSidebar: any;

  const TestContentComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    layoutSidebar = shallow(
      <LayoutWithBG>
        <TestContentComponent />
      </LayoutWithBG>
    );
  });

  it('contains a background', () => {
    expect(layoutSidebar.find(Background)).toHaveLength(1);
  });

  it('contains a Content component', () => {
    expect(layoutSidebar.find(Content)).toHaveLength(1);
  });

  it('contains a Content component with the children prop', () => {
    expect(layoutSidebar.find(Content).find(TestContentComponent)).toHaveLength(1);
  });
});

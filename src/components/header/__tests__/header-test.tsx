import React, { SFC } from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('Layout with Skewed Background', () => {
  const title = 'Hello!';

  const TestContentComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    this.headerLayout = shallow(
      <Header title={title}>
        <TestContentComponent />
      </Header>
    );
  });

  it('contains a header tag with the title', () => {
    expect(this.headerLayout.find('h1')).toHaveLength(1);
    expect(this.headerLayout.find('h1').text()).toEqual(title);
  });

  it('children property sets content', () => {
    expect(this.headerLayout.find(TestContentComponent)).toHaveLength(1);
  });
});

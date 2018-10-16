import React, { SFC } from 'react';
import { shallow } from 'enzyme';

import Header from '../index';

describe('Layout with Skewed Background', () => {
  let headerLayout: any;
  const title = 'Hello!';

  const TestContentComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    headerLayout = shallow(
      <Header title={title}>
        <TestContentComponent />
      </Header>
    );
  });

  it('contains a header tag with the title', () => {
    expect(headerLayout.find('h1')).toHaveLength(1);
    expect(headerLayout.find('h1').text()).toEqual(title);
  });

  it('children property sets content', () => {
    expect(headerLayout.find(TestContentComponent)).toHaveLength(1);
  });
});

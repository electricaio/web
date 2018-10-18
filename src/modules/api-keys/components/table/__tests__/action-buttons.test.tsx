import { shallow } from 'enzyme';
import React from 'react';
import { ActionButtons } from '../action-buttons';
import { RefreshButton, RemoveButton } from '../action-buttons.css';

describe('', () => {
  beforeEach(() => {
    this.component = shallow(<ActionButtons onRefresh={() => {}} onRemove={() => {}} />);
  });

  it('renders', () => {
    expect(this.component).toHaveLength(1);
  });

  it('has refresh button', () => {
    expect(this.component.find(RefreshButton)).toHaveLength(1);
  });

  it('has remove button', () => {
    expect(this.component.find(RemoveButton)).toHaveLength(1);
  });
});

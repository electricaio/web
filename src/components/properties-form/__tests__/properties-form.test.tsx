import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { PropertiesForm } from '../properties-form';
import { Row, Input, Icon, Button } from 'antd';

describe('Properties Form', () => {
  const properties = [
    {
      name: 'test name 1',
      value: 'test value 1',
    },
    {
      name: 'test name 2',
      value: 'test value 2',
    },
  ];

  const onchangeMock = jest.fn();

  beforeEach(() => {
    this.component = mount(<PropertiesForm onChange={onchangeMock} />);
  });

  it('contains add property button', () => {
    expect(this.component.find(Button)).toHaveLength(1);
  });

  it('clicking button adds new empty property', () => {
    // default value is one empty
    expect(this.component.state().properties).toHaveLength(1);
    this.component.find(Button).simulate('click');
    const newProperties = this.component.state().properties;
    expect(newProperties).toHaveLength(2);
    expect(newProperties[0]).toEqual({ name: '', value: '' });
  });

  it('Clicking delete property icon removes inputs', () => {
    expect(this.component.state().properties).toHaveLength(1);
    this.component
      .find(Icon)
      .at(0)
      .simulate('click');
    expect(this.component.state().properties).toHaveLength(0);
  });
  it('Clicking delete property calls onChange prop', () => {
    expect(this.component.state().properties).toHaveLength(1);
    this.component
      .find(Icon)
      .at(0)
      .simulate('click');
    expect(onchangeMock).toBeCalled();
  });

  it('creates inputs for each property', () => {
    this.component.setState({
      properties,
    });
    expect(this.component.find(Row)).toHaveLength(properties.length);
  });

  it('updates property value when input changes', () => {
    this.component.setState({
      properties,
    });
    const newValue = 'NEW VALUE TEST';
    const firstInput = this.component.find(Input).at(0);
    firstInput.simulate('change', { target: { value: newValue } });
    expect(this.component.state().properties[0].name).toEqual(newValue);
  });

  it('calls onChange prop when changing value', () => {
    this.component.setState({
      properties,
    });
    const firstInput = this.component.find(Input).at(0);
    firstInput.simulate('change', { target: { value: 'value' } });
    expect(onchangeMock).toBeCalled();
  });

  it('creates populates inputs from state', () => {
    this.component.setState({
      properties,
    });

    const inputValues = this.component
      .find(Input)
      .map((input: ReactWrapper) => input.prop('value'));
    expect(inputValues).toEqual(['test name 1', 'test value 1', 'test name 2', 'test value 2']);
  });
});

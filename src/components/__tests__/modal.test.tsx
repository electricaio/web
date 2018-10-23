import React from 'react';
import { shallow } from 'enzyme';
import { MainModal } from '../modal';
import { Modal } from 'antd';

describe('Modal', () => {
  const title = 'My modal';
  const handleSave = jest.fn();
  const handleCancel = jest.fn();
  beforeEach(() => {
    this.modalComponent = shallow(
      <MainModal
        submitText=""
        visible
        title={title}
        handleSave={handleSave}
        handleCancel={handleCancel}
      />
    );
  });

  it('sets props on Modal component', () => {
    const modal = this.modalComponent.find(Modal);
    expect(modal.prop('visible')).toBeTruthy();
    expect(modal.prop('title')).toEqual(title);
    expect(modal.prop('onOk')).toEqual(handleSave);
    expect(modal.prop('onCancel')).toEqual(handleCancel);
  });
});

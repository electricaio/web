import { shallow } from 'enzyme';
import React from 'react';
import { NewKeyModal } from '../new-key-modal';
import { NewApiButton } from '../new-key-modal.css';
import { MainModal } from '../../../../../components/modal';

describe('New Key Modal', () => {
  beforeEach(() => {
    this.newKeyComponent = shallow(<NewKeyModal onCommit={() => {}} />);
  });

  const mockFormRef = ({ resetFields = jest.fn(), validateFields = jest.fn() }) => {
    return {
      props: {
        form: {
          resetFields,
          validateFields,
        },
      },
    };
  };

  it('hides modal when cancel is called', () => {
    this.newKeyComponent.find(NewApiButton).simulate('click');
    this.newKeyComponent.instance().formRef = mockFormRef({});
    const modal = this.newKeyComponent.find(MainModal);

    expect(modal.prop('visible')).toBeTruthy();
    modal.prop('handleCancel')();
    expect(this.newKeyComponent.find(MainModal).prop('visible')).toBeFalsy();
  });

  it('shows modal when new api button is clicked', () => {
    this.newKeyComponent.find(NewApiButton).simulate('click');
    const modal = this.newKeyComponent.find(MainModal);
    expect(modal.prop('visible')).toBeTruthy();
  });

  it('validates fields on save', () => {
    const validateFieldsMock = jest.fn();
    this.newKeyComponent.instance().formRef = mockFormRef({ validateFields: validateFieldsMock });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(validateFieldsMock).toBeCalled();
  });

  it('resets fields on after validation', () => {
    const resetFieldsMock = jest.fn();
    this.newKeyComponent.instance().formRef = mockFormRef({
      validateFields: jest.fn(cb => cb()),
      resetFields: resetFieldsMock,
    });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(resetFieldsMock).toBeCalled();
  });

  it('hides the modal after creation', () => {
    this.newKeyComponent.find(NewApiButton).simulate('click');
    this.newKeyComponent.instance().formRef = mockFormRef({ validateFields: jest.fn(cb => cb()) });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(this.newKeyComponent.find(MainModal).prop('visible')).toBeFalsy();
  });
});

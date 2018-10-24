import { shallow } from 'enzyme';
import React from 'react';
import { ButtonActionModal } from '../modal-button-action';
import { MainModal } from '../../../../../components/modal';
import { ApiKeyForm } from '../../api-key-form/api-key-form';

describe('New Key Modal', () => {
  beforeEach(() => {
    this.newKeyComponent = shallow(
      <ButtonActionModal submitText="" title="" onCommit={() => {}}>
        <span className="clickable">Testing</span>
      </ButtonActionModal>
    );
  });

  const formFields = {
    apiKeyName: 'test',
    apiKey: '1234',
  };

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
    this.newKeyComponent.setState({
      visible: true,
    });
    this.newKeyComponent.instance().formRef = mockFormRef({});
    const modal = this.newKeyComponent.find(MainModal);

    expect(modal.prop('visible')).toBeTruthy();
    modal.prop('handleCancel')();
    expect(this.newKeyComponent.find(MainModal).prop('visible')).toBeFalsy();
  });

  it('adds onClick to child and displays modal when clicked', () => {
    this.newKeyComponent.find('.clickable').simulate('click');
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
    const formFields = {
      apiKeyName: 'test',
      apiKey: '1234',
    };
    this.newKeyComponent.instance().formRef = mockFormRef({
      validateFields: jest.fn(cb => cb(null, formFields)),
      resetFields: resetFieldsMock,
    });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(resetFieldsMock).toBeCalled();
  });

  it('hides the modal after creation', () => {
    this.newKeyComponent.setState({
      visible: true,
    });
    this.newKeyComponent.instance().formRef = mockFormRef({
      validateFields: jest.fn(cb => cb(null, formFields)),
    });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(this.newKeyComponent.find(MainModal).prop('visible')).toBeFalsy();
  });

  it('renders ApiKeyForm', () => {
    const apiKeyForm = this.newKeyComponent.find(ApiKeyForm);
    expect(apiKeyForm).toHaveLength(1);
  });
});

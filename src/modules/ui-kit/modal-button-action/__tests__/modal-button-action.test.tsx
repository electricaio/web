import { shallow } from 'enzyme';
import React, { SFC } from 'react';
import { ButtonActionModal } from '../modal-button-action';
import { MainModal } from '../../../../components/modal';

describe('Modal Button Action', () => {
  const TestComponent: SFC = () => <div>content</div>;

  beforeEach(() => {
    this.newKeyComponent = shallow(
      <ButtonActionModal
        submitText=""
        title=""
        onCommit={() => {}}
        formComponent={<TestComponent />}
      >
        <span className="clickable">Testing</span>
      </ButtonActionModal>
    );
  });

  const formFields = {
    connectionName: 'test',
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

  it('calls form validation on save', () => {
    const validateFieldsMock = jest.fn();
    this.newKeyComponent.instance().formRef = mockFormRef({ validateFields: validateFieldsMock });
    const modal = this.newKeyComponent.find(MainModal);
    modal.prop('handleSave')();
    expect(validateFieldsMock).toBeCalled();
  });

  it('resets fields on after validation', () => {
    const resetFieldsMock = jest.fn();
    const formFields = {
      connectionName: 'test',
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

  it('renders ConnectionForm', () => {
    const connectionForm = this.newKeyComponent.find(TestComponent);
    expect(connectionForm).toHaveLength(1);
  });
});

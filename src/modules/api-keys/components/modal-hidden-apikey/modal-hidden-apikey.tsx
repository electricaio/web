import React, { Component, Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Input, Modal, Spin } from 'antd';
import { ApplicationState } from '../../../../redux/store';
import { getKey } from '../../../../redux/api-keys/actions';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { StyledButton } from '../../../ui-kit/button';
import { MaskStyle } from './modal-hidden-apikey.css';

const { TextArea } = Input;

const mapStateToProps = ({ apiKeys }: ApplicationState) => ({
  apiKeys: apiKeys.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getKey: bindActionCreators(getKey, dispatch),
});

interface PropsFromState {
  apiKeys: ApiKeyModal[];
}

interface PropsFromDispatch {
  getKey: typeof getKey;
}

type AllProps = PropsFromState & PropsFromDispatch & THiddenApiKeyProps;

export type THiddenApiKeyProps = {
  entity: ApiKeyModal;
  children: ReactElement<any>;
};

export type THiddenApiKeyState = {
  visible: boolean;
};

export class HiddenAPIKeyModalComponent extends Component<AllProps, THiddenApiKeyState> {
  hiddenKey: string = null;

  readonly state: THiddenApiKeyState = {
    visible: false,
  };

  showModal = () => {
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleCopyKey = () => {
    const textarea = document.getElementById(
      `text-area-${this.props.entity.name}`
    ) as HTMLInputElement;
    textarea.select();
    document.execCommand('copy');
  };

  getKey = (): string => {
    this.props.getKey(this.props.entity.id);
    return (this.hiddenKey = this.props.apiKeys.find(item => item.id === this.props.entity.id).key);
  };

  render() {
    const { visible } = this.state;
    const { children } = this.props;

    return (
      <Fragment>
        <Modal
          visible={visible}
          title={''}
          closable={false}
          onCancel={this.closeModal}
          maskStyle={MaskStyle}
          centered
          width={700}
          footer={
            <StyledButton size="large" type="primary" onClick={this.handleCopyKey}>
              {'Copy Key'}
            </StyledButton>
          }
        >
          <Spin tip={`Loading ${this.props.entity.name} Access Key`} spinning={!this.getKey()}>
            <TextArea autosize value={this.hiddenKey} id={`text-area-${this.props.entity.name}`} />
          </Spin>
        </Modal>
        {React.cloneElement(children, {
          onClick: this.showModal,
        })}
      </Fragment>
    );
  }
}

export const HiddenAPIKeyModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(HiddenAPIKeyModalComponent);

import React, { Component, Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Input, Modal, Spin } from 'antd';
import { ApplicationState } from '../../../../redux/store';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { StyledButton } from '../../../ui-kit/button';
import { MaskStyle } from './modal-hidden-api-key.css';
import { getKey } from '../../../../redux/api-keys/async';

const { TextArea } = Input;
const mapStateToProps = ({ apiKeys }: ApplicationState, { entity }: THiddenApiKeyProps) => ({
  hiddenApiKey: apiKeys.data.find(item => item.id === entity.id).key,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getKey: bindActionCreators(getKey, dispatch),
});

interface PropsFromState {
  hiddenApiKey: string;
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
  readonly state: THiddenApiKeyState = {
    visible: false,
  };

  showModal = () => {
    this.props.getKey(this.props.entity.id);
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

  render() {
    const { visible } = this.state;
    const { children, hiddenApiKey } = this.props;

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
          <Spin tip={`Fetching ${this.props.entity.name} Access Key`} spinning={!hiddenApiKey}>
            <TextArea autosize value={hiddenApiKey} />
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

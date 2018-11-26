import React, { Component, Fragment, ReactElement } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Input, Modal } from 'antd';
import { ApplicationState } from '../../../../redux/store';
import { getKey } from '../../../../redux/api-keys/actions';
import { ApiKeyModal } from '../../../../redux/api-keys/types';
import { CopyKeyButton, MaskStyle } from './modal-hidden-apikey.css';

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
  id: number;
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
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  handleCopyKey = () => {
    const textarea = document.getElementById('key-textarea') as HTMLInputElement;
    textarea.select();
    document.execCommand('copy');
  };

  getKey = (): string => {
    this.props.getKey(this.props.id);
    return this.props.apiKeys.filter(item => item.id === this.props.id)[0].key;
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
            document.queryCommandSupported('copy') && (
              <CopyKeyButton size="large" type="primary" onClick={this.handleCopyKey}>
                {'Copy Key'}
              </CopyKeyButton>
            )
          }
        >
          <TextArea autosize value={this.getKey()} id="key-textarea" />
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

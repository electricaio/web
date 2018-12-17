import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Icon, Tooltip } from 'antd';

export type CopyProps = {
  url: string;
};

export class Copy extends Component<CopyProps> {
  state = {
    copied: false,
  };

  handleCopy = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    });
  };

  render() {
    return (
      <Tooltip title={!this.state.copied ? 'Copy Url' : 'Copied!'}>
        <CopyToClipboard text={this.props.url} onCopy={this.handleCopy}>
          {!this.state.copied ? <Icon type="copy" /> : <Icon type="check" />}
        </CopyToClipboard>
      </Tooltip>
    );
  }
}

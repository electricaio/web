import React from 'react';
import { mount } from 'enzyme';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Copy } from '../copy';
import { Icon } from 'antd';

describe('Copy', () => {
  const url = 'the url to copy';

  beforeEach(() => {
    this.component = mount(<Copy url={url} />);
  });
  describe('handleCopy', () => {
    it('sets copied state to true', () => {
      this.component.instance().handleCopy();
      expect(this.component.state('copied')).toBeTruthy();
    });
  });

  describe('CopyToClipboard', () => {
    it('sets copy text to the url prop', () => {
      expect(this.component.find(CopyToClipboard).prop('text')).toEqual(url);
    });

    it('sets onCopy prop', () => {
      expect(this.component.find(CopyToClipboard).prop('onCopy')).toEqual(
        this.component.instance().handleCopy
      );
    });

    it('shows check icon if state copied is true', () => {
      this.component.setState({
        copied: true,
      });
      this.component.update();
      expect(this.component.find(Icon).prop('type')).toEqual('check');
    });

    it('shows copied icon if state copied is false', () => {
      this.component.setState({
        copied: false,
      });
      this.component.update();
      expect(this.component.find(Icon).prop('type')).toEqual('copy');
    });
  });
});

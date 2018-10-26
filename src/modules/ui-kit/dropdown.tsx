import React from 'react';
import { Menu, Dropdown, Button, Icon } from 'antd';

type TDropdownProps = {
  label: string;
  keepMenuOpen: boolean;
};

export class DropdownComponent extends React.Component<TDropdownProps> {
  state = {
    visible: false,
  };

  handleMenuClick = () => {
    const { keepMenuOpen } = this.props;
    if (!keepMenuOpen) {
      this.setState({ visible: false });
    }
  };

  handleVisibleChange = (flag: boolean) => {
    this.setState({ visible: flag });
  };

  render() {
    const menu = <Menu onClick={this.handleMenuClick}>{this.props.children}</Menu>;
    return (
      <Dropdown
        overlay={menu}
        onVisibleChange={this.handleVisibleChange}
        visible={this.state.visible}
      >
        <Button size="large" style={{ marginLeft: 8 }}>
          {this.props.label}
          <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

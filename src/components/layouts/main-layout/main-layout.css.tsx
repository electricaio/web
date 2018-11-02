import { Layout } from 'antd';
import styled from 'styled-components';

export const StyledLayout = styled(Layout)`
  height: 100%;
`;
export const ContainerContent = styled(Layout.Content)`
  padding-top: 0px !important;
  &.ant-layout-content {
    margin: 0px 250px;
  }
`;

export const Header = styled(Layout.Header)`
  padding: 0 275px !important;
  height: 70px;
  display: flex;
`;

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

const { Sider, Header } = Layout;

export const NavigationText = styled.div`
  text-transform: uppercase;
`;

export const StyledLink = styled(Link)`
  color: black;
`;

export const LayoutContainer = styled(Layout)`
  min-height: 100vh !important;
`;

export const LayoutSider = styled(Sider)`
  background-color: #2b303f !important;
`;

export const LayoutHeader = styled(Header)`
  background-color: #2b303f !important;
`;
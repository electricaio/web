import styled from 'styled-components';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const StyledLink = styled(Link)`
  color: black;
`;

export const NavContainer = styled(Menu)`
  display: flex;
  flex: 1;
  align-items: center;
  display: flex;
  text-transform: uppercase;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

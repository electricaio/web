import { Icon } from 'antd';
import styled from 'styled-components';

export type TCardStyles = {
  isActive?: boolean;
};

export const Ul = styled.ul`
  padding: 30px 0 0 0;
  list-style: none;
`;

export const Li = styled.li`
  border-left: ${(props: TCardStyles) => (props.isActive ? '2px solid #01d8a8' : '')};
  height: 50px;
  padding-left: ${(props: TCardStyles) => (props.isActive ? '0' : '2px')};
  cursor: default;
`;

export const Link = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: default;
  height: 100%;
  color: ${(props: TCardStyles) => (props.isActive ? '#fff' : '#AAACB2')};

  &:hover {
    color: ${(props: TCardStyles) => (props.isActive ? '#fff' : '#AAACB2')};
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`;

export const StyledIcon = styled(Icon)`
  margin-right: 5px;
  margin-left: 15px;
`;

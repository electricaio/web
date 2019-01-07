import styled, { css } from 'styled-components';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

export const HeaderText = styled.h1`
  margin: 40px 0;
`;
export const CssContainer = css`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  color: white;
`;

export const Container = styled.div`
  ${CssContainer}
  background-color: ${props => props.color};

`;
const FooterContainer = css`
  ${CssContainer} background-color: #f8f8f8;
  padding: 10px;
`;

export const LinkedFooter = styled(Link)`
  ${FooterContainer};
  color: ${props => props.color};
  &:hover {
    color: ${props => props.color};
  }
`;

export const StatIcon = styled(Icon)`
  font-size: 50px;
`;
export const Details = styled.div`
  text-align: center;
`;
export const Stat = styled.div`
  font-size: 22px;
`;
export const StyledLink = styled(Link)`
  font-size: 22px;
`;

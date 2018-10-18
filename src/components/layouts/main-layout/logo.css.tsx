import styled from 'styled-components';

export const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  margin-right: 70px;
  cursor: default;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`;

export const Icon = styled.img`
  color: #fff;
  width: 36px;
  height: 36px;
  margin-right: 10px;
`;

export const CompanyName = styled.div`
  color: #fff;
  font-size: 17px;
`;

import styled from 'styled-components';

export type TLiTheme = {
  isActive?: boolean;
};

export const Container = styled.ul`
  display: flex;
  align-items: stretch;
  margin: 0 auto 0 0;
`;

export const Li = styled.li`
  display: flex;
  width: 100px;
  background-color: ${(props: TLiTheme) => (props.isActive ? '#827AE9' : 'none')};

  &:hover {
    background-color: ${(props: TLiTheme) =>
      props.isActive ? '#827AE9' : 'rgba(140, 131, 250, 0.3)'};
  }
`;

export const Link = styled.a`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  text-align: center;
  text-decoration: none;
  color: ${(props: TLiTheme) => (props.isActive ? '#fff' : '#979AA1')};

  &:hover {
    color: #fff;
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
  }

  &:active {
    text-decoration: none;
  }
`;

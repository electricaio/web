import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0;
  font-weight: bold;
  font-size: 16px;
`;

export const NewButton = styled.button`
  width: 180px;
  height: 50px;
  text-transform: uppercase;
  color: #fff;
  background-color: #6760fa;

  &:hover {
    background-color: #5851d3;
  }
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

import { Card } from 'antd';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  width: 600px;
  border-radius: 5px;
  box-shadow: 0 0 25px 0 rgba(113, 150, 193, 0.2);
`;

export const Background = styled.div`
  transform: skewY(-9deg);
  background: #2b303f;
  height: 530px;
  position: absolute;
  width: 100%;
  margin-top: -160px;
  z-index: 0;
`;

export const StyledHorizonalCenteredCard = styled(StyledCard)`
  &.ant-card {
    margin: 0 auto;
  }
`;

export const Centered = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

import styled from 'styled-components';
import { Button } from 'antd';

export const StyledButton = styled(Button as any)`
  &.ant-btn {
    height: 50px;
    text-transform: uppercase;
  }

  margin-top: ${props => (props as any).withTopMargin && '10px'};

  height: 50px;
  text-transform: uppercase;
`;

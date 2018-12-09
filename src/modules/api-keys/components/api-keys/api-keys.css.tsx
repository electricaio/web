import styled from 'styled-components';
import { Icon } from 'antd';
import { StyledButton } from '../../../ui-kit/button';

export const ApiIcon = styled(Icon)`
  font-size: 25px;
  margin-right: 10px;
`;

export const NewApiButton = styled(StyledButton)`
  text-transform: uppercase;
  text-align: right;
  margin-top: 20px;
  &:after {
    clear: both;
    display: block;
    content: ' ';
  }
`;

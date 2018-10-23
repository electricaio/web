import styled from 'styled-components';
import { StyledButton } from '../../../ui-kit/button';

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

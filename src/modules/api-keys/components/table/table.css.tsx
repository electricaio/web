import styled from 'styled-components';
import { Button, Icon } from 'antd';

export const StyledEye = styled(Icon)`
  text-align: right;
  color: black;
  font-size: 20px;
  cursor: pointer;
`;

export const KeyContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CopyKeyButton = styled(Button as any)`
  border: none !important;
  color: blue !important;
`;

export const MaskStyle = {
  backgroundColor: `rgba(0, 0, 0, 0.15)`,
};

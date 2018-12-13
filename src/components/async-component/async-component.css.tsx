import styled from 'styled-components';
import { Spin, Icon } from 'antd';

export const Spinner = styled(Spin as any)`
  display: block !important;
  left: 40% !important;
  position: absolute !important;
  top: 40% !important;
`;
export const ErrorIcon = styled(Icon as any)`
  font-size: 30px !important;
`;

export const LoadingIcon = styled(Icon as any)`
  font-size: 30px !important;
`;

import styled from 'styled-components';
import { Button, Icon } from 'antd';

export const Container = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  > i {
    margin-right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
`;

export const RefreshButton = styled(Button as any)`
  margin-right: 10px;
  background-color: #dafaf3 !important;
`;

export const RemoveButton = styled(Button as any)`
  background-color: #e8e7ff !important;
`;

export const DeleteIcon = styled(Icon)`
  color: red !important;
  font-size: 18px !important;
`;

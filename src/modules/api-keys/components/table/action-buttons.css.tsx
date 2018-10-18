import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BaseButton = styled.button`
  border-radius: 5px;
  height: 30px;
  outline: none;
  font-size: 13px;
`;
export const RefreshButton = styled(BaseButton)`
  margin-right: 10px;
  background-color: #dafaf3;
`;

export const RemoveButton = styled(BaseButton)`
  background-color: #e8e7ff;
`;

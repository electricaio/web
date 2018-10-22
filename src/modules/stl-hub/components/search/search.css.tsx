import React from 'react';
import styled from 'styled-components';
import { Card, Input } from 'antd';

export const SearchContainer = styled(Card)`
  margin-bottom: 30px !important;
  padding: 0 40px !important;
  border-radius: 5px;
  box-shadow: 0 0 25px 0 rgba(113, 150, 193, 0.2);
`;

// @ts-ignore
export const SearchInput = styled(Input)`
  > .ant-input-suffix {
    right: 0 !important;
  }
`;
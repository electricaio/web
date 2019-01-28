import styled from 'styled-components';

import { Card } from 'antd';

export const FilterCard = styled(Card)`
  margin-bottom: 20px !important;
`;

export const Container = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
`;

export const FiltersContainer = styled.div`
  justify-content: flex-start;
`;

export const ButtonContainer = styled.div`
  justify-content: flex-end;
  flex: 1;
  text-align: right;
`;

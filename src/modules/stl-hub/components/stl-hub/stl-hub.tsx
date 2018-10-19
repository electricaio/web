import React, { SFC } from 'react';
import { Row } from 'antd';
import { StlHubContainer } from './stl-hub.css';
import { StlCard } from '../card/card';
import { SearchItem } from '../search/search';

export const StlPage: SFC = () => (
  <StlHubContainer>
      <SearchItem/>
      <Row>
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
        <StlCard />
      </Row>
  </StlHubContainer>
);
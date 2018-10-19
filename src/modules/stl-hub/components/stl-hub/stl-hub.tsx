import React, { SFC } from 'react';
import { Row, Col } from 'antd';
import { StlHubContainer } from './stl-hub.css';
import { StlCard } from '../card/card';
import { SearchItem } from '../search/search';

export const StlPage: SFC = () => (
  <StlHubContainer>
      <SearchItem/>
      <Row gutter={24}>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
        <Col span={8}><StlCard /></Col>
      </Row>
  </StlHubContainer>
);
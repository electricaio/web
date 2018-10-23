import React, { SFC } from 'react';
import { Row, Col } from 'antd';
import { StlHubContainer } from './stl-hub.css';
import StlCard from '../card/card';
import { SearchItem } from '../search/search';

const StlPage: SFC = () => (
  <StlHubContainer>
      <SearchItem/>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
        <Col xs={24} sm={24} md={12} lg={8} xl={6}><StlCard /></Col>
      </Row>
  </StlHubContainer>
);

export default StlPage;
import React, { SFC } from 'react';
import { Row, Col } from 'antd';
import { StlCard } from '../card/card';
import { RowItem } from './stl-hub.css';

const cardRow = <Row>
  <RowItem gutter={64}>
    <Col span={8}><StlCard /></Col>
    <Col span={8}><StlCard /></Col>
    <Col span={8}><StlCard /></Col>
  </RowItem>
  <RowItem gutter={64}>
    <Col span={8}><StlCard /></Col>
    <Col span={8}><StlCard /></Col>
    <Col span={8}><StlCard /></Col>
  </RowItem>
</Row>;

export const StlPage: SFC = () => (cardRow);
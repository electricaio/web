import React from 'react';
import styled from 'styled-components';
// @ts-ignore
import media from 'styled-media-query';
import { Button, Card, Row } from 'antd';

const imgSalesforce = require('../../../../assets/salesforce.png');
const imgMySql = require('../../../../assets/mysql.jpg');

// @ts-ignore
export const ButtonItem = styled(Button)`
  width: 100%;
`;

export const CardItem = styled(Card.Grid)`=
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  
  ${media.lessThan("medium")`
    /* screen width is less than 768px (medium) */
    width: 30% !important;
    margin-left: 3%;
  `}

  ${media.between("medium", "large")`
    /* screen width is between 768px (medium) and 1170px (large) */
    width: 28% !important;
    margin-left: 5%;
  `}

  ${media.greaterThan("large")`
    /* screen width is greater than 1170px (large) */
    width: 25% !important;
    margin-left: 8%;
  `}
`;

const SpanContainer = styled.span``;
SpanContainer.defaultProps = {
  color: 'white',
};

export const TypeItem = styled(SpanContainer)`
  background-color: ${props => props.color};
  padding: 2px 5px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

interface LogoProps {
  src: string;
}

export const Logo = styled.div<LogoProps>`
  width: 100%;
  height: 200px;
  background: ${props => props.src === 'salesforce' ? `url(${imgSalesforce})` : `url(${imgMySql})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Title = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

export const KeyItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

// @ts-ignore
export const RowItem = styled(Row)`
  margin: 10px 0;
`;

export const Description = styled.p`
  text-align: left;
`;
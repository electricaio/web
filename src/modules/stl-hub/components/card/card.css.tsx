import React from 'react';
import styled, { StyledFunction } from 'styled-components';
// @ts-ignore
import media from 'styled-media-query';
import { Button, Card, Row } from 'antd';

const imgSalesforce = require('../../../../assets/salesforce.png');
const imgMySql = require('../../../../assets/mysql.jpg');

interface ButtonItemProps {
  color: string;
}

// @ts-ignore
const button: StyledFunction<ButtonItemProps & React.HTMLProps<HTMLInputElement>> = styled(Button);

export const ButtonItem = button`
  width: 100%;
  font-size: 0.8vw !important;
  color: white !important;
  background-color: ${props => props.color} !important;
`;

export const CardItem = styled(Card)`=
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 30px !important;
  position: relative;
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
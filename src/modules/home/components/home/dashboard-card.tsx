import React from 'react';
import { Card, Icon } from 'antd';
import { Container, StatIcon, Details, Stat, LinkedFooter } from './dashboard-card.css';

interface DashboardCardProps {
  stat: number;
  text: string;
  color: string;
  iconType: string;
  linkTo: string;
}

export const DashboardCard: React.SFC<DashboardCardProps> = ({
  stat,
  text,
  iconType,
  color,
  linkTo,
}) => {
  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Container color={color}>
        <StatIcon type={iconType} theme="filled" />
        <Details>
          <Stat>{stat}</Stat>
          <div>{text}</div>
        </Details>
      </Container>
      <Footer linkTo={linkTo} color={color} />
    </Card>
  );
};

interface FooterProps {
  color: string;
  linkTo: string;
}
export const Footer: React.SFC<FooterProps> = ({ color, linkTo }) => {
  return (
    <LinkedFooter to={linkTo} color={color}>
      <span>View Details</span>
      <Icon type="right-circle" theme="filled" />
    </LinkedFooter>
  );
};

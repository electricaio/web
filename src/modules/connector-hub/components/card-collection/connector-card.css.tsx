import styled from 'styled-components';
import { Card, Col } from 'antd';

const { Meta } = Card;

export const StyledCard = styled(Card)`
  margin-bottom: 20px !important;
`;
export const Description = styled.div`
  font-weight: bold;
`;

export const ImageContainer = styled.div`
  display: flex !important;
  justify-content: center;
`;

export const CompanyImage = styled.img`
  height: 200px;
  width: auto !important;
  padding: 20px;
`;

export const StyledMeta = styled(Meta)`
  text-align: center;
  margin-bottom: 20px !important;
`;

export const ErnCol = styled(Col as any)`
  font-weight: bold;
  text-transform: uppercase;
`;

export const ButtonContainer = styled.div`
  text-align: center;
  margin: 20px;
`;

export const ErnValue = styled.span`
  color: #69c0ff;
  font-size: 16px;
`;

export const NoKeys = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  font-style: italic;
  text-align: left;
  height: 50px;
`;

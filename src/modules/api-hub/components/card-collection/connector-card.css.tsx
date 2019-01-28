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
  height: 130px;
  padding: 20px;
  padding-bottom: 0px;
`;

export const CompanyImage = styled.img`
  height: 100%;
  width: auto;
  max-width: 100%;
  max-height: 15em;
  width: auto !important;
`;

export const LanguageImage = styled.img`
  height: 40px;
  width: auto;
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
  margin-top: 20px;
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

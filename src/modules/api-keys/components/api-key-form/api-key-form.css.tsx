import styled from 'styled-components';
import { Button, Form } from 'antd';

export const GenerateKeyContainer = styled.div`
  display: flex;
`;

export const GenerateButton = styled(Button as any)`
  margin-left: 5px;
  margin-top: 10px;
`;

export const StyledFormItem = styled(Form.Item as any)`
  flex-grow: 1;
`;

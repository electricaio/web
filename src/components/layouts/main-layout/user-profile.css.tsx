import { Avatar } from 'antd';
import styled from 'styled-components';

export const Profile = styled.div`
  justify-content: flex-end;
  display: flex;
  align-items: center;
`;

export const Name = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;

export const StyledIcon = styled(Avatar as any)`
  color: #fff;
`;

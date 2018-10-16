import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Inner = styled.div`
  width: 100%;
  margin: 0 40px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 14px;
  padding: 18px 35px;

  > table {
    border-spacing: 0;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
`;

export const TrHead = styled.tr`
  height: 75px;
`;

export const Tr = styled.tr`
  height: 75px;

  &:hover {
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.13);
  }
`;

export const Th = styled.th`
  text-transform: uppercase;
  border-bottom: 1px solid #e5e9ec;
  border-collapse: collapse;
`;

export const Td = styled.td`
  border-bottom: 1px solid #e5e9ec;
  border-collapse: collapse;
`;

export const EmptyCell = styled(Td)`
  width: 20px;
`;

export const NameHeader = styled(Th)`
  min-width: 150px;
`;

export const NameCell = styled(Td)`
  min-width: 150px;
`;

export const KeyHeader = styled(Th)`
  min-width: 200px;
  text-align: center;
`;

export const KeyCell = styled(Td)`
  min-width: 200px;
  text-align: center;
`;

export const CreatedHeader = styled(Th)`
  min-width: 150px;
  text-align: center;
`;

export const CreatedCell = styled(Td)`
  min-width: 200px;
  text-align: center;
  color: #8293a7;
`;

export const ActionHeader = styled(Th)`
  min-width: 200px;
  text-align: center;
`;

export const ActionCell = styled(Td)`
  min-width: 150px;
  text-align: center;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 90%;
  height: 30px;
  font-size: 14px;
  border-bottom: 1px solid #000;
`;

import styled from 'styled-components/native'
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin-left: 8px;
`;


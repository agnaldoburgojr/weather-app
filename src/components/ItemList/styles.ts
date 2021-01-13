import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Description = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin-left: 4px;
  opacity: 0.6;
`;

export const Icon = styled(FeatherIcon)`
  opacity: 0.6
`;


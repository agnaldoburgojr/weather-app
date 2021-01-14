import styled from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  opacity: 0.8;
  text-align: center;
  margin-bottom: 12px;
`;

export const Description = styled.Text`
  color: ${colors.white};
  opacity: 0.6;
  text-align: center;
`;

export const Icon = styled(FeatherIcon)`
  opacity: 0.8;
  margin-bottom: 36px;
`;
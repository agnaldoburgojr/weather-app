import styled from 'styled-components/native'
import colors from '../../styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.blue}
`;

export const Content = styled.View`
  flex: 1;
  padding:  100px 36px;
  align-items: center;
  justify-content: space-between;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const LottieContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const Temperature = styled.Text`
  align-items: center;
  font-size: 72px;
  color: ${colors.white};
  padding-right: 24px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 48px;
  border-radius: 24px;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: ${colors.blue};
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
`;

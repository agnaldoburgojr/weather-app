import React, { useCallback } from 'react';
import { Container, Content, Header, Temperature, Button, TextButton, LottieContainer, List } from './styles';
import { Text, TouchableOpacity } from 'react-native'
import { useApp } from '../../hooks/app'
import { LottieAnimation, ItemList } from '../../components'
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../styles/colors';

const Weather: React.FC = () => {
  const { loadData, loading, address, forecast } = useApp()

  const handlePress = useCallback(()=> {
    loadData()
  }, [loadData])

  return (
    <Container>
      <LinearGradient
        colors={[colors.lightBlue, colors.blue]}
        style={{ flex: 1 }}
      >
        <Content>
          <Header>
            <Temperature>25º</Temperature>
            <LottieContainer>
              <LottieAnimation/>
            </LottieContainer>
          </Header>
          <List>
            <ItemList name='wind' description='12'/>
            <ItemList name='wind' description='12'/>
            <ItemList name='wind' description='12'/>
            <ItemList name='wind' description='12'/>
          </List>
          
          <Button onPress={handlePress}>
            <TextButton>Atualizar dados</TextButton>
          </Button>
      </Content>
      </LinearGradient>
    </Container>
  )}

export default Weather;

// {!loading && (
//   <>
//     <Text>{JSON.stringify(address)}</Text>
//     <Text>{JSON.stringify(forecast)}</Text>
    
//   </>
// )}
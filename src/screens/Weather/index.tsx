import React, { useCallback } from 'react';
import { Container, Content, Header, Temperature, Button, TextButton, LottieContainer, List, CityContainer, City, Description, AddressContainer, Address, AddressPart, Icon } from './styles';
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
            <Temperature>25ºC</Temperature>
            <LottieContainer>
              <LottieAnimation/>
            </LottieContainer>
          </Header>
          <List>
            <ItemList name='arrow-up' description='12ºC'/>
            <ItemList name='arrow-down' description='12ºC'/>
            <ItemList name='droplet' description='12%'/>
            <ItemList name='wind' description='12 m/s'/>
          </List>
          <CityContainer>
            <City>Ourinhos</City>
            <Description>Dia ensolarado</Description>
          </CityContainer>
          <AddressContainer>
            <Icon name='map-pin' color={colors.white} size={20} />
            <Address>
              <AddressPart>R. Brasil, 357 - Vila Christoni</AddressPart>
              <AddressPart>Ourinhos - SP, 19911-690</AddressPart>
              <AddressPart>Brasil</AddressPart>
            </Address>
          </AddressContainer>

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
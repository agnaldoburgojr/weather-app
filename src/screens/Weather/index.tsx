import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { LottieAnimation, ItemList } from '../../components'
import { useApp } from '../../hooks/app'
import colors from '../../styles/colors';
import { Header, Temperature, LottieContainer, List, LoadingContainer } from './styles';
import { Container, Content, Section, Middle, Footer } from './styles'
import { AddressContainer, Address, AddressPart, Icon } from './styles'
import { CityContainer, City, Description, Button, TextButton } from './styles'

const Weather: React.FC = () => {
  const { loadData, loading, address, forecast } = useApp()

  const handlePress = useCallback(()=> {
    loadData()
  }, [loadData])

  return (
    <Container>
      <LinearGradient
        colors={[forecast.isNight
                  ? colors.darkBlue 
                  : colors.lightBlue, 
                colors.blue]}
        style={{ flex: 1 }}
      >
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.white}/>
        </LoadingContainer>
      ) : (
        <Content>
          <Section>
            <Header>
              <Temperature>{`${forecast.temp}ºC`}</Temperature>
              <LottieContainer>
                <LottieAnimation reference={forecast.reference}/>
              </LottieContainer>
            </Header>
            <List>
              <ItemList name='arrow-up' description={`${forecast.tempMax}ºC`}/>
              <ItemList name='arrow-down' description={`${forecast.tempMin}ºC`}/>
              <ItemList name='droplet' description={`${forecast.humidity}%`}/>
              <ItemList name='wind' description={`${forecast.wind}m/s`}/>
            </List>
          </Section>
          <Middle>
            <CityContainer>
              <City>{forecast.city}</City>
              <Description>{forecast.description}</Description>
            </CityContainer>
            <AddressContainer>
              <Icon name='map-pin' color={colors.white} size={20} />
              <Address>
                <AddressPart>{address.address}</AddressPart>
                <AddressPart>{address.moreInfo}</AddressPart>
                <AddressPart>Brasil</AddressPart>
              </Address>
            </AddressContainer>
          </Middle>
          <Footer>
            <Button onPress={handlePress}>
              <TextButton>Atualizar dados</TextButton>
            </Button>
          </Footer>
        </Content>
      )}
      </LinearGradient>
    </Container>
  )}

export default Weather;
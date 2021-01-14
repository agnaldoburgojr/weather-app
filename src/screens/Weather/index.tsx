import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { LottieAnimation, ItemList, Error } from '../../components'
import { useApp } from '../../hooks/app'
import colors from '../../styles/colors';
import { Header, Temperature, LottieContainer, List, LoadingContainer } from './styles';
import { Container, Content, Section, Middle, Footer } from './styles'
import { AddressContainer, Address, AddressPart, Icon } from './styles'
import { CityContainer, City, Description, Button, TextButton } from './styles'
import getAnimation from './getAnimation'

const Weather: React.FC = () => {
  const { loadData, loading, address, forecast, error } = useApp()

  const [opacity, setOpacity] = React.useState(new Animated.Value(0));
  const [offsetSection, setOffsetSection] = React.useState(new Animated.ValueXY({x: 0, y: 200}));
  const [offsetCity, setOffsetCity] = React.useState(new Animated.ValueXY({x: -200, y: 0}));
  const [offsetAddress, setOffsetAddress] = React.useState(new Animated.ValueXY({x: 500, y: 0}));
  const [offsetButton, setOffsetButton] = React.useState(new Animated.ValueXY({x: 0, y: 200}));
  const [opacityButton, setOpacityButton] = React.useState(new Animated.Value(0));

  useEffect(()=> {
    if(loading){
      setOffsetSection(new Animated.ValueXY({x: 0, y: 200}))
      setOffsetCity(new Animated.ValueXY({x: -200, y: 0}))
      setOffsetAddress(new Animated.ValueXY({x: 500, y: 0}))
      setOffsetButton(new Animated.ValueXY({x: 0, y: 200}))
      setOpacity(new Animated.Value(0))
      setOpacityButton(new Animated.Value(0))
    }
    if(!loading){
      getAnimation({ opacity, offsetSection, offsetCity, offsetAddress, opacityButton, offsetButton }).start();
    }   
  }, [loading])

  const handlePress = useCallback(()=> {
    loadData()
  }, [loadData])

  const getGradientColor = useCallback((): string => {
    return forecast.isNight ? colors.darkBlue : colors.lightBlue
  }, [forecast.isNight])

  return (
    <Container>
      <LinearGradient
        colors={[ getGradientColor(), colors.blue ]}
        style={{ flex: 1 }}
      >
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size="large" color={colors.white}/>
        </LoadingContainer>
      ) : (
        <Animated.View style={{opacity: opacity, flex: 1}}>
          <Content>
            {error.title ? (
              <Error error={error} />
            ) : (
              <>
                <Animated.View style={{transform: [{translateY: offsetSection.y}]}}>
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
                </Animated.View>
                <Middle>
                  <Animated.View style={{transform: [{translateX: offsetCity.x}]}}>
                    <CityContainer>
                      <City>{forecast.city}</City>
                      <Description>{forecast.description}</Description>
                    </CityContainer>
                  </Animated.View>
                  <Animated.View style={{transform: [{translateX: offsetAddress.x}]}}>
                    <AddressContainer>
                      <Icon name='map-pin' color={colors.white} size={20} />
                      <Address>
                        <AddressPart>{address.address}</AddressPart>
                        <AddressPart>{address.moreInfo}</AddressPart>
                        <AddressPart>Brasil</AddressPart>
                      </Address>
                    </AddressContainer>
                  </Animated.View>
                </Middle>
              </>
            )}
            <Animated.View style={{transform: [{translateY: offsetButton.y}], opacity: opacityButton, width: '100%'}}>
              <Footer>
                <Button onPress={handlePress}>
                  <TextButton>Atualizar dados</TextButton>
                </Button>
              </Footer>
            </Animated.View>
          </Content>
        </Animated.View>
      )}
      </LinearGradient>
    </Container>
  )}

export default Weather;
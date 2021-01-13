import React, { useCallback } from 'react';
import { Container, Content } from './styles';
import { Text, TouchableOpacity } from 'react-native'
import { useApp } from '../../hooks/app'
import { LottieAnimation } from '../../components'
import { LinearGradient } from 'expo-linear-gradient';

const Weather: React.FC = () => {
  const { loadData, loading, address, forecast } = useApp()

  const handlePress = useCallback(()=> {
    loadData()
  }, [loadData])

  return (
    <Container>
      <LinearGradient
        colors={['#10b0c2', '#00324b']}
        style={{flex: 1}}
      >
        <Content>
          <LottieAnimation/>
          {!loading && (
            <>
              <Text>{JSON.stringify(address)}</Text>
              <Text>{JSON.stringify(forecast)}</Text>
              <TouchableOpacity onPress={handlePress}>
                <Text>Clique</Text>
              </TouchableOpacity>
            </>
          )}
      </Content>
      </LinearGradient>
    </Container>
  )}

export default Weather;
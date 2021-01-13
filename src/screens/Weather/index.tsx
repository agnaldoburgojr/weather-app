import React, { useCallback } from 'react';
import { Container } from './styles';
import { Text, TouchableOpacity } from 'react-native'
import { useApp } from '../../hooks/app'
import { LottieAnimation } from '../../components'

const Weather: React.FC = () => {
  const { loadData, loading, address, forecast } = useApp()

  const handlePress = useCallback(()=> {
    loadData()
  }, [loadData])

  

  return (
    <Container>
      {!loading && (
        <>
          <Text>{JSON.stringify(address)}</Text>
          <Text>{JSON.stringify(forecast)}</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text>Clique</Text>
          </TouchableOpacity>
        </>
      )}
      <LottieAnimation/>
    </Container>
  )}

export default Weather;
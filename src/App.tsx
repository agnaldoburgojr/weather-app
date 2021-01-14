import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Weather from './screens/Weather'
import Provider from './hooks'

type Coords = {
  latitude: number,
  longitude: number
}
const App:React.FC = () => {
  const [location, setLocation] = useState({} as Coords);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') return
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
      setLocation({latitude, longitude})
    })();
  }, []);

  return (
    <Provider >
      <Weather />
      <StatusBar style="light" />
    </Provider>
  );
}

export default registerRootComponent(App)

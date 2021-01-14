import React from 'react';
import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar';
import Weather from './screens/Weather'
import Provider from './hooks'

const App:React.FC = () => {
  return (
    <Provider >
      <Weather />
      <StatusBar style="light" />
    </Provider>
  );
}

export default registerRootComponent(App)

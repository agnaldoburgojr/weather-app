import { registerRootComponent } from 'expo'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useApp } from './hooks/app'
import Weather from './screens/Weather'
import Provider from './hooks'

const App:React.FC = () => {
  const { loadData } = useApp()

 

  return (
    <Provider >
      <Weather />
      <StatusBar style="auto" />
    </Provider>
  );
}

export default registerRootComponent(App)

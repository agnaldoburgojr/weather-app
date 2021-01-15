import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import * as Location from 'expo-location';
import { Address, Forecast } from '../domain/models'
import { AxiosGetClient } from '../infra/usecases/axios-get-client/AxiosGetClient'
import {GoogleRemoteAddress, OpenWeatherRemoteForecast } from '../data/usecases'
import config from '../config'

export type ErrorData = {
  title: string,
  description: string,
}
interface AppContextData {
  loadData (): void;
  loading: boolean;
  address: Address;
  forecast: Forecast;
  error: ErrorData;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppProvider: React.FC = ({ children }) => {
  const initialErrors = {title: '', description: ''}
  const [ loading, setLoading ] = useState(false)
  const [ address, setAddress ] = useState({} as Address)
  const [ forecast, setForecast ] = useState({} as Forecast)
  const [ error, setError ] = useState<ErrorData>(initialErrors)
  
  const loadData = useCallback(async () => {
    setLoading(true)

    const { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted'){
      setError({
        title: 'Ops, parece que você não possui permissão de localização!',
        description: 'Vá em configurações ou tente Atualizar Dados no botão abaixo'
      })
      setLoading(false)
    }
    
    try {
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
    
      const axiosGetClientGoogle = new AxiosGetClient()
      const googleRemoteAddress = new GoogleRemoteAddress(config.googleURL, axiosGetClientGoogle)
      const newAddress = await googleRemoteAddress.getAddress({latitude, longitude}, config.googleKey)
      setAddress(newAddress)

      const axiosGetClientOpenWeather = new AxiosGetClient()
      const openWeatherRemoteForecast = new OpenWeatherRemoteForecast(config.openWeatherURL, axiosGetClientOpenWeather)
      const newForecast = await openWeatherRemoteForecast.getForecast({latitude, longitude}, config.openWeatherKey)
      setForecast(newForecast)
      setError(initialErrors)
    } catch (error) {
      setError({
        title: 'Ops, algo errado aconteceu!',
        description: 'Ocorreu um problema no servidor, tente Atualizar Dados no botão abaixo ou tente mais tarde.'
      })
    } finally {
      setLoading(false)
    }
   }, [])

  useEffect(() => {
    loadData()
  }, [])

  return (
    <AppContext.Provider value={{ loadData, loading, forecast, address, error }}>
      {children}
    </AppContext.Provider>
  );
};

function useApp(): AppContextData {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  return context;
}

export { AppProvider, useApp };

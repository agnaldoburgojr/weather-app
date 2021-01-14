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
interface AppContextData {
  loadData (): void;
  loading: boolean;
  address: Address;
  forecast: Forecast;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

const AppProvider: React.FC = ({ children }) => {
  const [ loading, setLoading ] = useState(false)
  const [ address, setAddress ] = useState({} as Address)
  const [ forecast, setForecast ] = useState({} as Forecast)
  
  const loadData = useCallback(async () => {
     setLoading(true)
    
    // const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
    
    // const axiosGetClientGoogle = new AxiosGetClient()
    // const googleRemoteAddress = new GoogleRemoteAddress(config.googleURL, axiosGetClientGoogle)
    // const newAddress = await googleRemoteAddress.getAddress({latitude, longitude}, config.googleKey)
    // setAddress(newAddress)

    // const axiosGetClientOpenWeather = new AxiosGetClient()
    // const openWeatherRemoteForecast = new OpenWeatherRemoteForecast(config.openWeatherURL, axiosGetClientOpenWeather)
    // const newForecast = await openWeatherRemoteForecast.getForecast({latitude, longitude}, config.openWeatherKey)
    // setForecast(newForecast)

    setLoading(false)
      setAddress({
        address: 'R. Brasil, 357 - Vila Christoni',
        moreInfo: 'Ourinhos - SP, 19911-690',
      })
      setForecast({
        main: 'Clear',
        description: 'dia ensolarado'[0].toUpperCase() + 'dia ensolarado'.substr(1),
        reference: '10n',
        temp: 28,
        tempMin: 25,
        tempMax: 31,
        humidity: 71,
        wind: 3.3,
        city: 'Ourinhos',
        isNight: '10n'.substr(-1) === 'n'
      })
   }, [])

  useEffect(()=> {
    loadData()
  }, [])

  return (
    <AppContext.Provider value={{ loadData, loading, forecast, address }}>
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

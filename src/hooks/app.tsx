import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

type Address = {
  street: string,
  number: string,
  neighborhood: string,
  zipcode: string,
  city: string,
  state: string
}

type Forecast = {
  weatherMain: string,
  description: string,
  temp: number,
  feelsLike: number,
  tempMin: number,
  tempMax: number,
  pressure: number,
  humidity: number
}

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
    console.log('entrou aqui')
    await setTimeout(() => {
      console.log('Agora aqui')
      setAddress({
        street: 'rua Brasil',
        number: '367',
        neighborhood: 'Nova Christoni',
        zipcode: '1999000',
        city: 'Ourinhos',
        state: 'São Paulo'
      })
  
      setForecast({
        weatherMain: 'Claro',
        description: 'Dia ensolarado',
        temp: 25,
        feelsLike: 70.5,
        tempMin: 36,
        tempMax: 22,
        pressure: 1,
        humidity: 60
      })
      console.log('here')
      setLoading(false)
    }, 1000)
    
  }, [])

  useEffect(()=> {
    loadData()
  }, [])

  return (
    <AppContext.Provider
      value={{ loadData, loading, forecast, address }}
    >
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

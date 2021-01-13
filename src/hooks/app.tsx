import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';

type Address = {
  address: string,
  moreInfo: string,
}

type Forecast = {
  main: string,
  description: string,
  reference: string,
  temp: number,
  tempMin: number,
  tempMax: number,
  humidity: number,
  wind: number,
  city: string,
  period: 'night' | 'day'
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
        address: 'R. Brasil, 357 - Vila Christoni',
        moreInfo: 'Ourinhos - SP, 19911-690',
      })
      setForecast({
        main: 'Clear',
        description: 'dia ensolarado',
        reference: '10n',
        temp: 28,
        tempMin: 25,
        tempMax: 31,
        humidity: 71,
        wind: 3.3,
        city: 'Ourinhos',
        period: '10n'.substr(-1) === 'n' ? 'night' : 'day'
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

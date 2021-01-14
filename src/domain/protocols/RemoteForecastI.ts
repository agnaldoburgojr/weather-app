import { Location, Forecast } from '../models'

export interface RemoteForecastI {
  getForecast:(location: Location, key: string) => Promise<Forecast>
}
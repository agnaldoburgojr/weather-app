import {  Forecast } from '../models'

export interface RemoteForecastI {
  getForecast:() => Promise<Forecast>
}
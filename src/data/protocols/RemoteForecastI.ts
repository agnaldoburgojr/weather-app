import {  Forecast } from '../../domain/models'

export interface RemoteAddressI {
  getForecast:() => Promise<Forecast>
}
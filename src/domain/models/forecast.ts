export type Forecast = {
  main: string,
  description: string,
  reference: string,
  temp: number,
  tempMin: number,
  tempMax: number,
  humidity: number,
  wind: number,
  city: string,
  isNight: boolean
}
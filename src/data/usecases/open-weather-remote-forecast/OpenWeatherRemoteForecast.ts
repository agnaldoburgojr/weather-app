import { Location, Forecast } from '../../../domain/models'
import { UnexpectedError } from "../../../domain/errors";
import { HttpGetClientI, RemoteForecastI, HttpStatusCode } from "../../../domain/protocols";

type OpenWeatherRemoteParams = {
  lat: number,
  lon: number,
  appid: string,
  units: string,
  lang: string,
}
export class OpenWeatherRemoteForecast implements RemoteForecastI {
  constructor (
   private readonly url: string, 
   private readonly httpGetClient: HttpGetClientI<OpenWeatherRemoteParams, any>
  ){}

  async getForecast({ latitude, longitude }: Location, key: string) :Promise<Forecast> {
    const params = {
      lat: latitude,
      lon: longitude,
      appid: key,
      units: 'metric',
      lang: 'pt_br',
    }

    const httpResponse = await this.httpGetClient.get({ url: this.url, params })

    if(httpResponse.statusCode === HttpStatusCode.ok) {
      console.log('Response ok hahaha', httpResponse.body)
      return this.formatForecast(httpResponse.body)
    }
    throw new UnexpectedError('OpenWeatherRemoteForecast')
  }

  private formatForecast(forecast: any): Forecast {
    const description = forecast.weather[0].description
    const icon = forecast.weather[0].icon
    
    return {
      main: forecast.weather[0].main,
      description: description[0].toUpperCase() + description.substr(1),
      reference: icon,
      temp: parseInt(forecast.main.temp),
      tempMin: parseInt(forecast.main.temp_min),
      tempMax: parseInt(forecast.main.temp_max),
      humidity: forecast.main.humidity,
      wind: forecast.wind.speed,
      city: forecast.name,
      isNight: icon.substr(-1) === 'n'
    }
  }
}
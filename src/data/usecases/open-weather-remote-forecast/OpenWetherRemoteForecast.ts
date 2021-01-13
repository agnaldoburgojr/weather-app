import { Location, Address } from '../../../domain/models'
import { HttpGetClientI, HttpStatusCode } from "../../../infra/protocols";
import { UnexpectedError } from "../../../domain/errors";

export default class OpenWeatherRemoteForecast {
 constructor (
   private readonly url: string, 
   private readonly httpGetClient: HttpGetClientI<any, any>
  ){}

  async getForecast({ latitude, longitude }: Location, key: string) : Promise<any> {
    const params = {
      lat: latitude,
      lon: longitude,
      appid: key,
      units: 'metric',
      lang: 'pt_br',
    }

    const httpResponse = await this.httpGetClient.get({ url: this.url, params })

    if(httpResponse.statusCode === HttpStatusCode.ok) {
      return httpResponse.body
    }
    throw new UnexpectedError('OpenWeatherRemoteForecast')
  }
}
import { Address, Location } from '../../../domain/models'
import { UnexpectedError } from "../../../domain/errors";
import { HttpGetClientI, HttpStatusCode, RemoteAddressI } from "../../../domain/protocols";

export type GoogleRemoteParams = {
  key: string,
  latlng: string,
  language: string
}
export class GoogleRemoteAddress implements RemoteAddressI {
  constructor (
    private readonly url: string, 
    private readonly httpGetClient: HttpGetClientI<GoogleRemoteParams, any>
  ){}

  async getAddress({ latitude, longitude }: Location, key: string) : Promise<Address> {
    const params = {
      key,
      latlng: `${latitude},${longitude}`,
      language: 'pt-BR'
    }

    const httpResponse = await this.httpGetClient.get({ url: this.url, params })

    if(!httpResponse.body || 
       !httpResponse.body.status || 
       httpResponse.body.status !== 'OK' || 
       httpResponse.statusCode !== HttpStatusCode.ok) {
      throw new UnexpectedError()
    }

    return this.formatAddress(httpResponse.body.results[0].formatted_address)
  }

  private formatAddress(addressString: string): Address{
    const arrayAddress = addressString.split(',')
    
    return { 
      address: `${arrayAddress[0].trim()}, ${arrayAddress[1].trim()}`, 
      moreInfo: `${arrayAddress[2].trim()}, ${arrayAddress[3].trim()}`
    }
  }
}
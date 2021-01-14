import { Address, Location } from '../../../domain/models'
import { UnexpectedError } from "../../../domain/errors";
import { HttpGetClientI, RemoteAddressI } from "../../../domain/protocols";

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

    if(httpResponse.body.status !== 'OK') {
      throw new UnexpectedError()
    }
    return this.formatAddress(httpResponse.body.results[0].formatted_address)
  }

  private formatAddress(addressString: string): Address{
    const arrayAddress = addressString.split(',')
    
    return { 
      address: `${arrayAddress[0]} ${arrayAddress[1]}`.trim(), 
      moreInfo: `${arrayAddress[2]}${arrayAddress[3]}`.trim()
    }
  }
}
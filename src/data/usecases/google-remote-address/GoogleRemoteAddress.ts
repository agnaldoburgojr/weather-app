import { RemoteAddressI } from '../../../domain/protocols';
import { Address, Location } from '../../../domain/models'
import { HttpGetClientI, HttpStatusCode } from "../../../domain/protocols";
import { UnexpectedError } from "../../../domain/errors";

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

    if(httpResponse.statusCode === HttpStatusCode.ok) {
      return this.formatAddress(httpResponse.body.results[0].formatted_address)
    }
    throw new UnexpectedError('GoogleRemoteAuthentication')
  }

  private formatAddress(addressString: string): Address{
    const arrayAddress = addressString.split(',')
    
    return { 
      address: `${arrayAddress[0]} ${arrayAddress[1]}`.trim(), 
      moreInfo: `${arrayAddress[2]}${arrayAddress[3]}`.trim()
    }
  }
}
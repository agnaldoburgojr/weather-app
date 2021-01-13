import { RemoteAddressI } from "../../protocols/RemoteAddressI";
import { Location, Address } from '../../../domain/models'
import { HttpGetClientI, HttpStatusCode } from "../../../infra/protocols";
import { UnexpectedError } from "../../../domain/errors";

export type GoogleRemoteParams = {
  key: string,
  latlng: string,
}

export default class GoogleRemoteAddress implements RemoteAddressI {
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
      const { street, number, neighborhood, zipcode, city, state } = httpResponse.body
      return { street, number, neighborhood, zipcode, city, state }
    }
    throw new UnexpectedError('GoogleRemoteAuthentication')
  }
}
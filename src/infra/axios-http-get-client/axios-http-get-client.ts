import { HttpGetClientI, HttpGetParams, HttpResponse } from '../protocols'
import axios, { AxiosResponse } from 'axios'

export class AxiosHttpGetClient implements HttpGetClientI<any, any> {
  async get(params: HttpGetParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.get(params.url, { params: params.params })
    } catch (error) {
      httpResponse = error
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}

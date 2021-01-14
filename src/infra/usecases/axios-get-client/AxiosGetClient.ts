import axios, { AxiosResponse } from 'axios'
import { HttpGetParams, HttpResponse, HttpStatusCode } from '../../../domain/protocols'

export class AxiosGetClient {
  async get(queryParams: HttpGetParams<any>): Promise<HttpResponse<any>> {
    let httpResponse: AxiosResponse<any>
    try {
      httpResponse = await axios.get(queryParams.url, { params: queryParams.params })
    } catch (error) {
      if(error.message === 'Network Error'){
        return { statusCode: HttpStatusCode.serverError }
      }
      httpResponse = error.response
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data
    }
  }
}

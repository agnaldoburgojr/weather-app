import { HttpGetClientI, HttpGetParams, HttpResponse, HttpStatusCode } from '../protocols'

export class HttpGetClientSpy<T, R> implements HttpGetClientI<T, R> {
  url?: string
  body?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.body = params.params
    return await Promise.resolve(this.response)
  }
}

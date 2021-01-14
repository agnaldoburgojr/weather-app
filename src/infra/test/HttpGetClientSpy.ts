import { HttpGetClientI, HttpResponse, HttpGetParams, HttpStatusCode } from '../../domain/protocols'

export class HttpGetClientSpy<T, R> implements HttpGetClientI<T, R> {
  url?: string
  params?: T
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
    body: {} as unknown as R
  }

  async get (params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url
    this.params = params.params
    return await Promise.resolve(this.response)
  }
}

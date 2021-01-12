import { HttpResponse } from './http-response'

export type HttpGetParams<T> = {
  url: string
  params?: T
}

export interface HttpGetClientI<T, R> {
  get: (params: HttpGetParams<T>) => Promise<HttpResponse<R>>
}

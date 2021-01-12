import { HttpGetParams, HttpResponse } from './types'

export interface HttpGetClientI<T, R> {
  get: (queryParams: HttpGetParams<T>) => Promise<HttpResponse<R>>
}
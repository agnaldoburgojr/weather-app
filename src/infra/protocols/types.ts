export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  unauthorided = 401,
  serverError = 500
}

export type HttpGetParams<T> = {
  url: string
  params?: T
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode
  body?: T
}
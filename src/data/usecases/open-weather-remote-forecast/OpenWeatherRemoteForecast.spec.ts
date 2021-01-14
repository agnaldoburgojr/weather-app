import faker from 'faker'
import { HttpGetClientSpy } from '../../../infra/test/HttpGetClientSpy'
import { HttpStatusCode } from '../../../domain/protocols'
import { UnexpectedError } from '../../../domain/errors'
import { mockSuccessResponseOpenWeather, mockFailureResponseOpenWeather, mockLocation, mockForecast } from '../../test'
import { OpenWeatherRemoteForecast, OpenWeatherRemoteParams } from './OpenWeatherRemoteForecast'

type SutTypes = {
  sut: OpenWeatherRemoteForecast
  httpGetClientSpy: HttpGetClientSpy<OpenWeatherRemoteParams, any>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<OpenWeatherRemoteParams, any>()
  const sut = new OpenWeatherRemoteForecast(url, httpGetClientSpy)
  return { sut, httpGetClientSpy }
}

describe('OpenWeatherRemoteForecast', () => {
  test('Should be call HttpGetClient with correct url', () => {
    const url = faker.internet.url() 
    const { sut, httpGetClientSpy } = makeSut(url)

    sut.getForecast(mockLocation(), faker.random.uuid())
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should be call HttpGetClient with correct params', () => {
    const { sut, httpGetClientSpy } = makeSut()
    const appid = faker.random.uuid()
    const location = mockLocation()
    sut.getForecast(location, appid)
    expect(httpGetClientSpy.params).toEqual({
      appid,
      lang: 'pt_br',
      units: 'metric',
      lat: location.latitude,
      lon: location.longitude
    })
  })

  test('Should return a forecast is statusCode is 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const formattedForecast = mockForecast()
    const body = mockSuccessResponseOpenWeather(formattedForecast)
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const forecast = await sut.getForecast(mockLocation(), faker.random.uuid())
    expect(forecast).toEqual(formattedForecast)
  })

  test('Should throw UnexpectedError if statusCode is not 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const body = mockFailureResponseOpenWeather()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      body
    } 
    const promise = sut.getForecast(mockLocation(), faker.random.uuid())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if statusCode is not 200 and not exists body', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    } 
    const promise = sut.getForecast(mockLocation(), faker.random.uuid())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
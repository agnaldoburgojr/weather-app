import faker from 'faker'
import { HttpGetClientSpy } from '../../../infra/test/HttpGetClientSpy'
import { HttpStatusCode } from '../../../domain/protocols'
import { UnexpectedError } from '../../../domain/errors'
import { mockAddress, mockLocation } from '../../test'
import { GoogleRemoteAddress, GoogleRemoteParams } from './GoogleRemoteAddress'

type SutTypes = {
  sut: GoogleRemoteAddress
  httpGetClientSpy: HttpGetClientSpy<GoogleRemoteParams, any>
}
const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<GoogleRemoteParams, any>()
  const sut = new GoogleRemoteAddress(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('GoogleRemoteAddress', () => {
  test('should be call HttpGetClient with correct url', () => {
    const url = faker.internet.url() 
    const { sut, httpGetClientSpy } = makeSut(url)

    sut.getAddress(mockLocation(), faker.random.uuid())
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('should be call HttpGetClient with correct params', () => {
    const { sut, httpGetClientSpy } = makeSut()
    const key = faker.random.uuid()
    const latitude = faker.random.number()
    const longitude = faker.random.number()
    sut.getAddress({ latitude, longitude}, key)
    expect(httpGetClientSpy.params).toEqual({
      key,
      latlng: `${latitude},${longitude}`,
      language: 'pt-BR'
    })
  })

  test('Should return a address is stutusCode is 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const body = mockAddress()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const address = await sut.getAddress(mockLocation(), faker.random.uuid())
    expect(address).toEqual(body)
  })

  test('Should throw UnexpectedError if HttpGetClient not return statusCode 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorided
    }
    const promise = sut.getAddress(mockLocation(), faker.random.uuid())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
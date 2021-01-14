import faker from 'faker'
import { HttpGetClientSpy } from '../../../infra/test/HttpGetClientSpy'
import { HttpStatusCode } from '../../../domain/protocols'
import { UnexpectedError } from '../../../domain/errors'
import { mockFailureResponseGoogle, mockLocation, mockSuccessResponseGoogle } from '../../test'
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
  test('Should be call HttpGetClient with correct url', () => {
    const url = faker.internet.url() 
    const { sut, httpGetClientSpy } = makeSut(url)

    sut.getAddress(mockLocation(), faker.random.uuid())
    expect(httpGetClientSpy.url).toBe(url)
  })

  test('Should be call HttpGetClient with correct params', () => {
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

  test('Should return a address is statusCode is 200 and status of body is OK', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const mockAddress = "R. Any Street, 111 - Vila Christoni, Marília - SP, 11111-690, Brasil"
    const body = mockSuccessResponseGoogle(mockAddress)
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    }
    const address = await sut.getAddress(mockLocation(), faker.random.uuid())
    expect(address).toEqual({
      address: 'R. Any Street, 111 - Vila Christoni',
      moreInfo: 'Marília - SP, 11111-690'
    })
  })

  test('Should throw UnexpectedError if statusCode is 200 but status of body is not OK', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    const body = mockFailureResponseGoogle()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body
    } 
    const promise = sut.getAddress(mockLocation(), faker.random.uuid())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throw UnexpectedError if statusCode is not 200', async () => {
    const { sut, httpGetClientSpy } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
    } 
    const promise = sut.getAddress(mockLocation(), faker.random.uuid())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
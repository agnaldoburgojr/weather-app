import faker from 'faker'
import { HttpGetClientSpy } from "../../../infra/test/HttpGetClientSpy"
import { HttpStatusCode } from "../../../infra/protocols"
import { UnexpectedError } from "../../../domain/errors"
import { Address, Location } from "../../../domain/models"
import GoogleRemoteAddress, { GoogleRemoteParams } from "./GoogleRemoteAddress"

type SutTypes = {
  sut: GoogleRemoteAddress
  httpGetClientSpy: HttpGetClientSpy<GoogleRemoteParams, any>
}
const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<GoogleRemoteParams, any>()
  const sut = new GoogleRemoteAddress(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

const mockAddress = (): Address => ({
  street: faker.address.streetAddress(),
  number: faker.random.alpha(), 
  neighborhood: faker.random.word(), 
  zipcode: faker.random.alpha(), 
  city: faker.address.city(), 
  state: faker.address.state(), 
})

const mockLocation = (): Location => ({ 
  latitude: faker.random.number(), 
  longitude: faker.random.number()
})

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
    await expect(promise).rejects.toThrow(new UnexpectedError(''))
  })
})
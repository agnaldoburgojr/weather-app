import { AxiosHttpGetClient } from './axios-http-get-client'
import axios from 'axios'
import faker from 'faker'
import { HttpGetParams } from '../protocols'

jest.mock('axios')

const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number()
}

const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue(mockedAxiosResult)

const mockGetRequest = (): HttpGetParams<any> => ({
  url: faker.internet.url(),
  params: faker.random.objectElement()
})

const makeSut = (): AxiosHttpGetClient => {
  return new AxiosHttpGetClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockGetRequest()
    const sut = makeSut()
    await sut.get(request)
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { params: request.params })
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut()
    mockedAxios.get.mockRejectedValueOnce(mockedAxiosResult)
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })
})


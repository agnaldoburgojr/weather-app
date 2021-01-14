import axios from 'axios'
import { AxiosGetClient } from './AxiosGetClient'
import { mockAxiosResult, mockGetRequest} from '../../test'
import { HttpStatusCode } from '../../../domain/protocols'

jest.mock('axios')

const mockedAxiosResult = mockAxiosResult()

const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.get.mockResolvedValue(mockedAxiosResult)

const makeSut = (): AxiosGetClient => {
  return new AxiosGetClient()
}

describe('AxiosHttpClient', () => {
  test('Should call axios with correct values', async () => {
    const request = mockGetRequest()
    const sut = makeSut()
    await sut.get(request)
    expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { params: request.params })
  })

  test('Should return the correct statusCode and body when resolved request', async () => {
    const sut = makeSut()
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })

  test('Should return the correct statusCode and body when reject request', async () => {
    const sut = makeSut()
    mockedAxios.get.mockRejectedValueOnce({ response: mockedAxiosResult })
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data
    })
  })

  test('Should return statusCode 500 when exists a Network Error', async () => {
    const sut = makeSut()
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'))
    const httpResponse = await sut.get(mockGetRequest())
    expect(httpResponse).toEqual({
      statusCode: HttpStatusCode.serverError,
    })
  })
})


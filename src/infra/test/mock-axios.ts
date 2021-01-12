import { AxiosResponse } from 'axios'
import faker from 'faker'
import { HttpGetParams } from '../protocols'

export const mockGetRequest = (): HttpGetParams<any> => ({
  url: faker.internet.url(),
  params: faker.random.objectElement()
})

export const mockAxiosResult = (): Partial<AxiosResponse<any>> =>  ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})

import { HttpGetParams } from '../protocols'
import faker from 'faker'

export const mockGetRequest = (): HttpGetParams<any> => ({
  url: faker.internet.url(),
  params: faker.random.objectElement()
})

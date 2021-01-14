import { Location } from '../../domain/models'
import faker from 'faker'

export const mockLocation = (): Location => ({ 
  latitude: faker.random.number(), 
  longitude: faker.random.number()
})

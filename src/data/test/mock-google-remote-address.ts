import faker from 'faker'
import { Address, Location } from '../../domain/models'

export const mockAddress = (): Address => ({
  street: faker.address.streetAddress(),
  number: faker.random.alpha(), 
  neighborhood: faker.random.word(), 
  zipcode: faker.random.alpha(), 
  city: faker.address.city(), 
  state: faker.address.state(), 
})

export const mockLocation = (): Location => ({ 
  latitude: faker.random.number(), 
  longitude: faker.random.number()
})

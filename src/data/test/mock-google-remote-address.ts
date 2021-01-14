import faker from 'faker'
import { Location } from '../../domain/models'

export const mockSuccessResponse = (formatted_address = faker.random.words()): any => ({
  plus_code: faker.random.objectElement(),
  results: [{
    address_components: [ faker.random.objectElement, faker.random.objectElement],
    formatted_address,
    geometry: faker.random.objectElement(),
    place_id: faker.random.word(),
    types: [faker.random.word(), faker.random.word()]},],
  status: "OK"
})

export const mockFailureResponse = (): any => ({
  error_message: faker.random.words(),
  results: [],
  status: faker.random.word()
})

export const mockLocation = (): Location => ({ 
  latitude: faker.random.number(), 
  longitude: faker.random.number()
})

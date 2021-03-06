import faker from 'faker'

export const mockSuccessResponseGoogle = (formatted_address = faker.random.words()): any => ({
  plus_code: faker.random.objectElement(),
  results: [{
    address_components: [ faker.random.objectElement, faker.random.objectElement],
    formatted_address,
    geometry: faker.random.objectElement(),
    place_id: faker.random.word(),
    types: [faker.random.word(), faker.random.word()]},],
  status: "OK"
})

export const mockFailureResponseGoogle = (): any => ({
  error_message: faker.random.words(),
  results: [],
  status: faker.random.word()
})
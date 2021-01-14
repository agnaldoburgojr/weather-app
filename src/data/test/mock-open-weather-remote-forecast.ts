import faker from 'faker'
import { Forecast } from '../../domain/models'

export const mockForecast = (): Forecast => ({
  main: faker.random.word(),
  description: 'Some description',
  reference: faker.random.word() + 'n',
  temp: 25,
  tempMin: 25,
  tempMax: 25,
  humidity: 30,
  wind: 5,
  city: faker.random.word(),
  isNight: true
})

export const mockSuccessResponseOpenWeather = (forecast?: Forecast): any => ({
  coord: {
    lon: faker.random.number(4),
    lat: faker.random.number(4)
  },
  weather: [
    {
      id: faker.random.uuid(),
      main: forecast?.main || faker.random.word(),
      description: forecast?.description|| faker.random.word(),
      icon: forecast?.reference || faker.random.word()
    }
  ],
  base: faker.random.word(),
  main: {
    temp: forecast?.temp || faker.random.number(4),
    feels_like: faker.random.number(4),
    temp_min: forecast?.tempMin || faker.random.number(4),
    temp_max: forecast?.tempMax || faker.random.number(4),
    pressure: faker.random.number(4),
    humidity: forecast?.humidity || faker.random.number(4),
    sea_level: faker.random.number(4),
    grnd_level: faker.random.number(4)
  },
  visibility: faker.random.number(4),
  wind: {
    speed: forecast?.wind || faker.random.number(4),
    deg: faker.random.number(4)
  },
  clouds: {
    all: faker.random.number(4)
  },
  dt: faker.random.number(),
  sys: {
    country: faker.random.word(),
    sunrise: faker.random.number(),
    sunset: faker.random.number()
  },
  timezone: faker.random.number(),
  id: faker.random.number(),
  name: forecast?.city || faker.random.word(),
  cod: faker.random.number(3)
})

export const mockFailureResponseOpenWeather = (): any => ({
  cod: faker.random.number(3),
  message: faker.random.words()
})
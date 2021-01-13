import { Location, Address } from '../../domain/models'

export interface RemoteAddressI {
  getAddress:(location: Location, key: string) => Promise<Address>
}
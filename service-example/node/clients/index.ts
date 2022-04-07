import { IOClients } from '@vtex/api'

import Status from './status'
import { Weather } from './Queries/weather'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get status() {
    return this.getOrSet('status', Status)
  }

  public get weather() {
    return this.getOrSet('weather', Weather)
  }
}

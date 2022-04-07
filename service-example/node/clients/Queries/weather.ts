import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'
import axios from 'axios'

export class Weather extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('http://licensemanager.vtex.com.br/api/pvt/accounts', ctx, {
      ...options,
      headers: {
        ...(options && options.headers),
        ...{
          'Content-Type': 'application/json',
          store: '1',
        },
        ...(ctx.adminUserAuthToken
          ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
          : null),
      },
    })
  }

  public async weather(state: string) {
    const request = await axios.get(
      `https://goweather.herokuapp.com/weather/${state}`
    )

    console.log('clients > Queries > weather.ts =>', request)

    return request
  }
}

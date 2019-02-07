import { Observable, of, throwError } from 'rxjs'

import {
  IHttpService,
  IBaseResponse,
  IBaseResponseError,
  IHttpDeleteQueryCall,
  IHttpGetQueryCall,
  IHttpPostQueryCall,
  IHttpPutQueryCall,
  IHttpQueryOptions
} from 'kentico-cloud-core'

export type FakeResponseConfig = {
  fakeResponseJson?: any
  throwCloudError?: boolean
  errorJson?: any
}

export class AdvancedTestHttpService implements IHttpService {
  constructor(public config: Map<RegExp, FakeResponseConfig>) {
    Object.assign(this, config)
  }

  get<TError extends any, TRawData extends any>(
    call: IHttpGetQueryCall<TError>,
    _options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    const match = Array.from(this.config.entries()).find(item =>
      item[0].test(call.url)
    )

    if (!match) {
      return throwError({
        originalError: `URL ${call.url} does not match to the configuration.`,
        mappedError: call.mapError(
          `URL ${call.url} does not match to the configuration.`
        )
      } as IBaseResponseError<TError>)
    }

    const responseConfig = match[1]
    if (responseConfig.throwCloudError) {
      const fakeError = {
        response: {
          data: responseConfig.errorJson
        }
      }
      return throwError({
        originalError: fakeError,
        mappedError: call.mapError(fakeError)
      } as IBaseResponseError<TError>)
    }

    // return fake response
    return of({
      data: responseConfig.fakeResponseJson,
      response: undefined
    } as IBaseResponse<TRawData>)
  }

  post<TError extends any, TRawData extends any>(
    call: IHttpPostQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    return this.get(call, options)
  }

  put<TError extends any, TRawData extends any>(
    call: IHttpPutQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    return this.get(call, options)
  }

  delete<TError extends any, TRawData extends any>(
    call: IHttpDeleteQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    return this.get(call, options)
  }
}

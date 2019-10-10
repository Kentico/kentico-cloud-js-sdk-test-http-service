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
} from '@kentico/kontent-core'
import { promises } from 'fs'

export type FakeResponseConfig = {
  fakeResponseJson?: any
  throwError?: boolean
  errorJson?: any
}

export class KontentTestHttpService implements IHttpService {
  constructor(public config: Map<RegExp, FakeResponseConfig>) {
    Object.assign(this, config)
  }

  retryPromise<T>(
    promise: Promise<T>,
    _options: {
      maxRetryAttempts: number
      useRetryForResponseCodes: number[]
      delay: number
    }
  ): Promise<T> {
    return promise
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
    if (responseConfig.throwError) {
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

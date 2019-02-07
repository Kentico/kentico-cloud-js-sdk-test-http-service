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

export class AdvancedTestHttpService implements IHttpService {
  public throwCloudError: boolean = false
  public fakeResponseJson: any = undefined
  public errorJson: any = undefined

  constructor(config: {
    fakeResponseJson?: any
    throwCloudError?: boolean
    errorJson?: any
  }) {
    Object.assign(this, config)
  }

  get<TError extends any, TRawData extends any>(
    call: IHttpGetQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson
        }
      }
      return throwError({
        originalError: fakeError,
        mappedError: call.mapError(fakeError)
      } as IBaseResponseError<TError>)
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined
    } as IBaseResponse<TRawData>)
  }

  post<TError extends any, TRawData extends any>(
    call: IHttpPostQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson
        }
      }
      return throwError({
        originalError: fakeError,
        mappedError: call.mapError(fakeError)
      } as IBaseResponseError<TError>)
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined
    } as IBaseResponse<TRawData>)
  }

  put<TError extends any, TRawData extends any>(
    call: IHttpPutQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson
        }
      }
      return throwError({
        originalError: fakeError,
        mappedError: call.mapError(fakeError)
      } as IBaseResponseError<TError>)
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined
    } as IBaseResponse<TRawData>)
  }

  delete<TError extends any, TRawData extends any>(
    call: IHttpDeleteQueryCall<TError>,
    options?: IHttpQueryOptions
  ): Observable<IBaseResponse<TRawData>> {
    // throw cloud error
    if (this.throwCloudError) {
      const fakeError = {
        response: {
          data: this.errorJson
        }
      }
      return throwError({
        originalError: fakeError,
        mappedError: call.mapError(fakeError)
      } as IBaseResponseError<TError>)
    }

    // return fake response
    return of({
      data: this.fakeResponseJson,
      response: undefined
    } as IBaseResponse<TRawData>)
  }
}

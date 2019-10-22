import { KontentTestHttpService, FakeResponseConfig } from '../index'
import { IHeader } from '@kentico/kontent-core'

describe('adventd-test-http.service.test', () => {
  const emptyConfig = new Map<RegExp, FakeResponseConfig>()

  const fakeResponse = 'fake response'
  const universalFakeResponseConfig = new Map<RegExp, FakeResponseConfig>()
  universalFakeResponseConfig.set(/.*/, {
    fakeResponseJson: fakeResponse
  })

  const fakeError = 'fake error'
  const universalErrorConfig = new Map<RegExp, FakeResponseConfig>()
  universalErrorConfig.set(/.*/, {
    errorJson: fakeError,
    throwError: true
  })

  describe('constructor', () => {
    it('instanciate function withour error', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )
      expect(fakeHttpService).toBeTruthy()
    })
  })

  describe('get', () => {
    it('error when config is empty', async () => {
      const fakeHttpService = new KontentTestHttpService(emptyConfig)

      fakeHttpService
        .get({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .subscribe({
          error: error => {
            expect(error).toHaveProperty('mappedError')
            expect(error).toHaveProperty('originalError')
            expect(error.mappedError).toEqual(error.originalError)
            expect(error.originalError).toContain(
              'does not match to the configuration.'
            )
          }
        })
    })

    it('error when config is is configured for error', () => {
      const fakeHttpService = new KontentTestHttpService(universalErrorConfig)

      fakeHttpService
        .get({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .subscribe({
          error: error => {
            expect(error).toHaveProperty('mappedError.response.data')
            expect(error).toHaveProperty('originalError.response.data')
            expect(error.mappedError.response.data).toEqual(
              error.originalError.response.data
            )
            expect(error.mappedError.response.data).toEqual(fakeError)
          }
        })
    })

    it('error when config is is configured for fake response', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )

      const result = await fakeHttpService
        .get({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(result).toHaveProperty('data')
      expect(result.data).toEqual(fakeResponse)
    })

    it('correct configuration is used', async () => {
      const itemResponse = 'items response'
      const typesResponse = 'types response'
      const dummyHeaders = [
        { header: 'dummy-header-name', value: 'dummy value' }
      ]
      const dummyStatus = 200
      const complexFakeResponseConfig = new Map<RegExp, FakeResponseConfig>()

      complexFakeResponseConfig.set(/https:\/\/deliver.kontent.ai\/.*\/items/, {
        fakeResponseJson: itemResponse,
        fakeHeaders: dummyHeaders,
        fakeStatus: dummyStatus
      })

      complexFakeResponseConfig.set(/https:\/\/deliver.kontent.ai\/.*\/types/, {
        fakeResponseJson: typesResponse,
        fakeHeaders: dummyHeaders,
        fakeStatus: dummyStatus
      })

      const fakeHttpService = new KontentTestHttpService(
        complexFakeResponseConfig
      )

      const typesResult = await fakeHttpService
        .get({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/types',
          mapError: error => error
        })
        .toPromise()

      expect(typesResult).toHaveProperty('data', typesResponse)
      expect(typesResult).toMatchSnapshot()

      const itemsResult = await fakeHttpService
        .get({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(itemsResult).toMatchSnapshot()
    })
  })

  describe('post', () => {
    it('calls get method implementation', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )
      const getSpy = jest.spyOn(fakeHttpService, 'get')

      await fakeHttpService
        .post({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          body: {},
          mapError: error => error
        })
        .toPromise()

      expect(getSpy).toHaveBeenCalled()
    })
  })

  describe('put', () => {
    it('calls get method implementation', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )
      const getSpy = jest.spyOn(fakeHttpService, 'get')

      await fakeHttpService
        .put({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          body: {},
          mapError: error => error
        })
        .toPromise()

      expect(getSpy).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('calls get method implementation', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )
      const getSpy = jest.spyOn(fakeHttpService, 'get')

      await fakeHttpService
        .delete({
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(getSpy).toHaveBeenCalled()
    })
  })

  describe('patch', () => {
    it('calls get method implementation', async () => {
      const fakeHttpService = new KontentTestHttpService(
        universalFakeResponseConfig
      )
      const getSpy = jest.spyOn(fakeHttpService, 'get')

      await fakeHttpService
        .patch({
          body: '',
          url:
            'https://deliver.kontent.ai/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(getSpy).toHaveBeenCalled()
    })
  })
})

import { AdvancedTestHttpService, FakeResponseConfig } from '../index'

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
    throwCloudError: true
  })

  describe('constructor', () => {
    it('instanciate function withour error', async () => {
      const advancedTestHttpService = new AdvancedTestHttpService(
        universalFakeResponseConfig
      )
      expect(advancedTestHttpService).toBeTruthy()
    })
  })

  describe('get', () => {
    it('error when config is empty', async () => {
      const advancedTestHttpService = new AdvancedTestHttpService(emptyConfig)

      advancedTestHttpService
        .get({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
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
      const advancedTestHttpService = new AdvancedTestHttpService(
        universalErrorConfig
      )

      advancedTestHttpService
        .get({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
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
      const advancedTestHttpService = new AdvancedTestHttpService(
        universalFakeResponseConfig
      )

      const result = await advancedTestHttpService
        .get({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(result).toHaveProperty('data')
      expect(result.data).toEqual(fakeResponse)
    })

    it('correct configuration is used', async () => {
      const itemResponse = 'items response'
      const typesResponse = 'types response'
      const complexFakeResponseConfig = new Map<RegExp, FakeResponseConfig>()

      complexFakeResponseConfig.set(
        /https:\/\/deliver.kenticocloud.com\/.*\/items/,
        {
          fakeResponseJson: itemResponse
        }
      )

      complexFakeResponseConfig.set(
        /https:\/\/deliver.kenticocloud.com\/.*\/types/,
        {
          fakeResponseJson: typesResponse
        }
      )

      const advancedTestHttpService = new AdvancedTestHttpService(
        complexFakeResponseConfig
      )

      const typesResult = await advancedTestHttpService
        .get({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/types',
          mapError: error => error
        })
        .toPromise()

      expect(typesResult).toHaveProperty('data')
      expect(typesResult.data).toEqual(typesResponse)

      const itemsResult = await advancedTestHttpService
        .get({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          mapError: error => error
        })
        .toPromise()

      expect(itemsResult).toHaveProperty('data')
      expect(itemsResult.data).toEqual(itemResponse)
    })
  })

  describe('post', () => {
    it('calls get method implementation', async () => {
      const advancedTestHttpService = new AdvancedTestHttpService(
        universalFakeResponseConfig
      )
      const getSpy = jest.spyOn(advancedTestHttpService, 'get')

      await advancedTestHttpService
        .post({
          url:
            'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
          body: {},
          mapError: error => error
        })
        .toPromise()

      expect(getSpy).toHaveBeenCalled()
    })
  })

  // describe('put', () => {
  //   it('calls get method implementation', async () => {
  //     const advancedTestHttpService = new AdvancedTestHttpService(universalFakeResponseConfig);
  //     const getMock = jest.fn();
  //     advancedTestHttpService.get = getMock;

  //     await advancedTestHttpService.put({
  //       url: 'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
  //       body: {},
  //       mapError: (error) => error
  //     });

  //     expect(getMock).toHaveBeenCalled();
  //   })
  // });

  // describe('delete', () => {
  //   it('calls get method implementation', async () => {
  //     const advancedTestHttpService = new AdvancedTestHttpService(universalFakeResponseConfig);
  //     const getMock = jest.fn();
  //     advancedTestHttpService.get = getMock;

  //     await advancedTestHttpService.delete({
  //       url: 'https://deliver.kenticocloud.com/975bf280-fd91-488c-994c-2f04416e5ee3/items',
  //       mapError: (error) => error
  //     });

  //     expect(getMock).toHaveBeenCalled();
  //   })
  // });
})

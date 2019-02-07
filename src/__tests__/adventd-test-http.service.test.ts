import { AdvancedTestHttpService } from '../index'

describe('adventd-test-http.service.test', () => {
  describe('constructor', () => {
    it('instanciate function withour error', () => {
      const advanedTestHttpService = new AdvancedTestHttpService({
        throwCloudError: false,
        fakeResponseJson: {}
      })
      expect(advanedTestHttpService).toBeTruthy()
    })
  })
})

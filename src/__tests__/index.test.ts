import * as index from '../'

describe('index', () => {
  it('exports advanced http tables', () => {
    expect(Object.keys(index).length).toBeGreaterThan(0)
    expect(index).toHaveProperty('KontentTestHttpService')
  })
})

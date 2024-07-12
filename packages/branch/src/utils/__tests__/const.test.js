const { TextDecoder } = require('util')
const { PERSONAL } = require('../../../dist/index')

describe('Test constants', () => {
  it('PERSONAL should be encoded ckb-default-hash', () => {
    const decoded = new TextDecoder().decode(PERSONAL)
    expect(decoded).toBe('ckb-default-hash')
  })
})

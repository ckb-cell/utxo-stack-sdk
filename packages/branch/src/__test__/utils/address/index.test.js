const {
  toAddressPayload,
  pubkeyToAddress,
  parseAddress,
  addressToScript,
  scriptToAddress,
} = require('../../../../dist')
const fixtures = require('./fixtures.json')

describe('Test address module', () => {
  describe('toAddressPayload', () => {
    const fixtureTable = Object.entries(fixtures.toAddressPayload).map(([title, { params, expected, exception }]) => [
      title,
      params,
      expected,
      exception,
    ])
    test.each(fixtureTable)(`%s`, (_title, params, expected, exception) => {
      expect.assertions(1)
      try {
        const actual = toAddressPayload(...params)
        expect(actual).toEqual(new Uint8Array(expected))
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })

  describe('pubkeyToAddress', () => {
    const fixtureTable = Object.entries(fixtures.pubkeyToAddress).map(([title, { params, expected, exception }]) => [
      title,
      params,
      expected,
      exception,
    ])

    test.each(fixtureTable)(`%s`, (_title, params, expected, exception) => {
      expect.assertions(1)
      try {
        const actual = pubkeyToAddress(...params)
        expect(actual).toBe(expected)
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })

  describe('parseAddress', () => {
    const fixtureTable = Object.entries(fixtures.parseAddress).map(([title, { params, expected, exception }]) => [
      title,
      params,
      expected,
      exception,
    ])

    test.each(fixtureTable)(`%s`, (_title, params, expected, exception) => {
      expect.assertions(1)
      try {
        const actual = parseAddress(...params)
        expect(actual).toEqual(typeof expected === 'string' ? expected : new Uint8Array(expected))
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })

  describe('addressToScript', () => {
    const fixtureTable = Object.entries(fixtures.addressToScript).map(([title, { params, expected, exception }]) => [
      title,
      params,
      expected,
      exception,
    ])

    test.each(fixtureTable)(`%s`, (_title, params, expected, exception) => {
      expect.assertions(1)

      try {
        const actual = addressToScript(...params)
        expect(actual).toEqual(expected)
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })

  describe('scriptToAddress', () => {
    const fixtureTable = Object.entries(fixtures.scriptToAddress).map(([title, { params, expected, exception }]) => [
      title,
      params,
      expected,
      exception,
    ])
    test.each(fixtureTable)(`%s`, (_title, params, expected, exception) => {
      expect.assertions(1)
      try {
        const actual = scriptToAddress(...params)
        expect(actual).toEqual(expected)
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })
})

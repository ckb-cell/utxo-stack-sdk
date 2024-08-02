const fixtures = require('./fixtures.json')
const rpc = require('../__mocks__/rpc')
const CellCollector = require('../__mocks__/CellCollector')

const { Branch } = require('../../../dist')

describe('branch', () => {
  const url = 'http://localhost:8114'
  let branch
  beforeEach(() => {
    branch = new Branch(url)
  })

  describe('load secp256k1 deps', () => {
    it('should return deps when genesis block is loaded', async () => {
      branch.rpc = rpc
      const expected = fixtures.loadDeps.secp256k1Dep
      const secp256k1Dep = await branch.loadSecp256k1Dep()
      expect(secp256k1Dep).toEqual(expected)
    })
  })

  describe('sign transaction', () => {
    const fixtureTable = Object.entries(fixtures.signTransaction).map(([title, { params, expected, exception }]) => [
      title,
      params.privateKey,
      params.transaction,
      expected,
      exception,
    ])
    test.each(fixtureTable)('%s', (_title, privateKey, transaction, expected, exception) => {
      expect.assertions(1)
      try {
        const signedTransactionWithPrivateKey = branch.signTransaction(privateKey)(transaction)
        expect(signedTransactionWithPrivateKey).toEqual(expected)
      } catch (err) {
        expect(err).toEqual(new Error(exception))
      }
    })
  })
})

const fixtures = require('./fixtures.json')
const rpc = require('../__mocks__/rpc')
const CellCollector = require('../__mocks__/CellCollector')

const { Branch } = require('../../../dist/index')

describe('branch', () => {
  const url = 'http://localhost:8114'
  let branch
  beforeEach(() => {
    branch = new Branch(url)
  })

  describe('instantiate with default configuration', () => {
    it('default url is http://localhost:8114', () => {
      const branch = new Branch()
      expect(branch.node.url).toBe('http://localhost:8114')
    })
  })

  describe('load data', () => {
    describe('load deps', () => {
      it('should throw an error when genesis block is not loaded', () => {
        expect.assertions(1)
        branch.rpc = {
          getBlockByNumber: jest.fn().mockResolvedValue(undefined),
        }
        return expect(branch.loadDeps()).rejects.toEqual(new Error('Fail to load the genesis block'))
      })

      it('should return deps when genesis block is loaded', async () => {
        expect.assertions(3)
        branch.rpc = rpc
        const expected = fixtures.loadDeps
        expect(branch.config.secp256k1Dep).toBeUndefined()
        const deps = await branch.loadDeps()
        expect(deps).toEqual(expected)
        expect(branch.config).toEqual(expected)
      })
    })

    it('load cells', async () => {
      const indexer = jest.fn()
      const lock = {
        codeHash: '0x1892ea40d82b53c678ff88312450bbb17e164d7a3e0a90941aa58839f56f8df2',
        hashType: 'type',
        args: '0xe2fa82e70b062c8644b80ad7ecf6e015e5f352f6',
      }
      const actual = await branch.loadCells({ indexer, CellCollector, lock })
      expect(actual).toHaveLength(10)
    })
  })

  describe('set node', () => {
    const newURL = 'http://localhost:8080'
    it('has url set by instantication', () => {
      expect(branch.node.url).toBe(url)
      expect(branch.rpc.node.url).toBe(url)
    })
    it('set node with url', () => {
      branch.setNode(newURL)
      expect(branch.node.url).toBe(newURL)
      expect(branch.rpc.node.url).toBe(newURL)
    })
    it('set node with node object', () => {
      branch.setNode({
        url,
      })
      expect(branch.node.url).toBe(url)
      expect(branch.node.url).toBe(url)
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

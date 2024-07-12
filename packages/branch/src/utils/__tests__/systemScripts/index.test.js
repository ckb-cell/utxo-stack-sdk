const { SECP256K1_BLAKE160, SECP256K1_MULTISIG } = require('../../../../dist/index')
const fixtures = require('./fixtures.json')

const getInfo = ({ codeHash, hashType, depType, mainnetOutPoint, testnetOutPoint }, isMain) => {
  const outPoint = isMain ? mainnetOutPoint : testnetOutPoint

  return { codeHash, hashType, depType, ...outPoint }
}

describe('Test System Scripts', () => {
  describe('Test secp256k1/blake160', () => {
    it('should has mainnet script', () => {
      expect(getInfo(SECP256K1_BLAKE160, true)).toEqual(fixtures.SECP256K1_BLAKE160.mainnet)
    })

    it('should has testnet script', () => {
      expect(getInfo(SECP256K1_BLAKE160, false)).toEqual(fixtures.SECP256K1_BLAKE160.testnet)
    })
  })

  describe('Test secp256k1/multisig', () => {
    it('should has mainnet script', () => {
      expect(getInfo(SECP256K1_MULTISIG, true)).toEqual(fixtures.SECP256K1_MULTISIG.mainnet)
    })

    it('should has testnet script', () => {
      expect(getInfo(SECP256K1_MULTISIG, false)).toEqual(fixtures.SECP256K1_MULTISIG.testnet)
    })
  })
})

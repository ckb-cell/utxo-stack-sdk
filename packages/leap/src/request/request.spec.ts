import { describe, it, expect } from 'vitest'
import { buildRequestLockArgs } from './lock-args'
import { RequestType } from '../types'
import { RequestLockArgs } from 'src/molecule/generated/leap'

describe('Leap request schemas', () => {
  // The test data is from Request lock contract test
  it('buildRequestLockArgs', () => {
    const targetChainId = '0x6d6f636b65642d6272616e63682d636861696e2d6964'
    const ownerLockHash = '0x4ea7f0a0a5289e4bf1bfe729ab4ade3cda05f41ae1d99794141d6918f6c7bdec'
    const assetTypeHash = '0x1ff51f0a2b27b23adedbbac692468db95eea8ebf7db51ee9cfa522a1c278d118'
    const requestTypeHash = '0xfdb601ecdd52d5e72bd07b5c856160274fed20f823bb1836a91ec5d8e2bf25a3'
    const transferAmount = BigInt(80)

    const requestLockArgs = buildRequestLockArgs({
      ownerLockHash,
      assetTypeHash,
      targetChainId,
      requestType: RequestType.CkbToBranch,
      requestTypeHash,
      transferAmount,
    })
    expect(requestLockArgs).toBe(
      '0xe30000001400000034000000540000005c000000fdb601ecdd52d5e72bd07b5c856160274fed20f823bb1836a91ec5d8e2bf25a34ea7f0a0a5289e4bf1bfe729ab4ade3cda05f41ae1d99794141d6918f6c7bdec000000000000000087000000140000001500000019000000330000000100000000160000006d6f636b65642d6272616e63682d636861696e2d6964000000004ea7f0a0a5289e4bf1bfe729ab4ade3cda05f41ae1d99794141d6918f6c7bdec500000000000000000000000000000001ff51f0a2b27b23adedbbac692468db95eea8ebf7db51ee9cfa522a1c278d118',
    )
  })

  it('unpack requestLockArgs', () => {
    const requestLockArgsHex =
      '0xcf0000001400000034000000540000005c000000d9911b00409a9f443ae7ed6b00d59dd1e33979e4c986478cf7863fcb7f62941b562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe0a00000000000080730000001400000015000000190000001f000000010000000002000000123400000000562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe00205fa012000000000000000000000029b0b1a449b0e7fb08881e1d810a6abbedb119e9c4ffc76eebbc757fb214f091'

    const { timeout, ownerLockHash, requestTypeHash } = RequestLockArgs.unpack(requestLockArgsHex)
    expect(timeout.toHexString()).toBe('0x800000000000000a')
    expect(ownerLockHash).toBe('0x562e4e8a2f64a3e9c24beb4b7dd002d0ad3b842d0cc77924328e36ad114e3ebe')
    expect(requestTypeHash).toBe('0xd9911b00409a9f443ae7ed6b00d59dd1e33979e4c986478cf7863fcb7f62941b')
  })
})

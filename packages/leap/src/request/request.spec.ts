import { describe, it, expect } from 'vitest'
import { buildRequestLockArgs } from './lock-args'
import { RequestType } from '../types'

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
})

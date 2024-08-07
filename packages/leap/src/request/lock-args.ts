import { Hex, RequestLockArgsParams } from 'src/types'
import { RequestLockArgs } from '../molecule/generated/leap'
import { bytesToHex, append0x } from '@utxo-stack/branch'
import { u8ToHex } from 'src/utils/hex'
import { generateSince } from '@ckb-lumos/base/lib/since'

export type TimeoutParams = Parameters<typeof generateSince>[0]

export const generateTimeout = (params: TimeoutParams) => generateSince(params)

export const buildRequestLockArgs = ({
  ownerLockHash,
  assetTypeHash,
  transferAmount,
  requestType,
  requestTypeHash,
  timeout,
  initialChainId,
  targetChainId,
}: RequestLockArgsParams): Hex => {
  const lockArgs = RequestLockArgs.pack({
    requestTypeHash: append0x(requestTypeHash),
    ownerLockHash: append0x(ownerLockHash),
    timeout: timeout ?? '0x0',
    content: {
      requestType: append0x(u8ToHex(requestType)),
      initialChainId: append0x(initialChainId ?? '0x'),
      targetChainId: append0x(targetChainId ?? '0x'),
      message: {
        type: 'Transfer',
        value: {
          ownerLockHash: append0x(ownerLockHash),
          assetType: append0x(assetTypeHash),
          amount: transferAmount,
        },
      },
    },
  })
  return bytesToHex(lockArgs)
}

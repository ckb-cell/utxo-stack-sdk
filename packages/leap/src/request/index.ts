import { Hex, RequestLockArgsProps } from 'src/types'
import { RequestLockArgs } from '../molecule/generated/leap'
import { bytesToHex } from '@utxo-stack/branch'
import { append0x, u8ToHex } from 'src/utils/hex'

export const buildRequestLockArgs = ({
  ownerLockHash,
  assetTypeHash,
  transferAmount,
  requestType,
  requestTypeHash,
  timeout,
  initialChainId,
  targetChainId,
}: RequestLockArgsProps): Hex => {
  const lockArgs = RequestLockArgs.pack({
    requestTypeHash: append0x(requestTypeHash),
    ownerLockHash: append0x(ownerLockHash),
    timeout: timeout ?? BigInt(0),
    content: {
      requestType: append0x(u8ToHex(requestType)),
      initialChainId: initialChainId ? append0x(initialChainId) : '0x',
      targetChainId: targetChainId ? append0x(targetChainId) : '0x',
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

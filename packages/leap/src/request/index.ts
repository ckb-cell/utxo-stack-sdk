import { Hex, RequestLockArgsProps } from 'src/types'
import { RequestLockArgs } from '../molecule/generated/leap'
import { Byte32 } from '../molecule/generated/blockchain'
import { bytesToHex, hexToBytes } from '@utxo-stack/branch'
import { append0x, u8ToHex } from 'src/utils/hex'
import { blockchain } from '@ckb-lumos/base'

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
      initialChainId: blockchain.Bytes.pack(append0x(initialChainId ?? '')),
      targetChainId: blockchain.Bytes.pack(append0x(targetChainId ?? '')),
      message: {
        type: 'Transfer',
        value: {
          ownerLockHash: Byte32.pack(hexToBytes(ownerLockHash)),
          assetType: Byte32.pack(hexToBytes(assetTypeHash)),
          amount: transferAmount,
        },
      },
    },
  })
  return bytesToHex(lockArgs)
}

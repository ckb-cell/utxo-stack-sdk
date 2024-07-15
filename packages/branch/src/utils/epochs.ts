import JSBI from 'jsbi'
import { assertToBeHexString } from './validators'
import { BranchComponents } from '../types'

export interface EpochInfo {
  length: string
  index: string
  number: string
}

export const serializeEpoch = ({ length, index, number }: EpochInfo): string => {
  assertToBeHexString(length)
  assertToBeHexString(index)
  assertToBeHexString(number)

  const epochSince = JSBI.add(
    JSBI.add(
      JSBI.add(
        JSBI.leftShift(JSBI.BigInt(0x20), JSBI.BigInt(56)),
        JSBI.leftShift(JSBI.BigInt(length), JSBI.BigInt(40)),
      ),
      JSBI.leftShift(JSBI.BigInt(index), JSBI.BigInt(24)),
    ),
    JSBI.BigInt(number),
  )

  return `0x${epochSince.toString(16)}`
}

export const parseEpoch = (epoch: BranchComponents.EpochInHeader) => ({
  length: `0x${JSBI.bitwiseAnd(
    JSBI.signedRightShift(JSBI.BigInt(epoch), JSBI.BigInt(40)),
    JSBI.BigInt(0xffff),
  ).toString(16)}`,
  index: `0x${JSBI.bitwiseAnd(JSBI.signedRightShift(JSBI.BigInt(epoch), JSBI.BigInt(24)), JSBI.BigInt(0xffff)).toString(
    16,
  )}`,
  number: `0x${JSBI.bitwiseAnd(JSBI.BigInt(epoch), JSBI.BigInt(0xffffff)).toString(16)}`,
})

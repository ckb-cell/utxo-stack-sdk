import JSBI from 'jsbi'
import { ECPair } from './crypto/ecpair'
import { hexToBytes, toBigEndian } from './convertors'
import { pubkeyToAddress, AddressOptions } from './address'
import { ParameterRequiredException, HexStringWithout0xException } from './exceptions'
import { blake2b } from './crypto'
import { serializeScript } from './serialization'
import { cellOccupied } from './size'
import { serializeRawTransaction } from './serialization/transaction'
import { PERSONAL } from './const'
import { BranchComponents } from '../types'

export * from './address'
export * from './serialization'
export * from './convertors'
export * from './epochs'
export * from './size'
export * from './crypto'
export * from './systemScripts'
export * from './const'
export * from './crypto/ecpair'
export * from './validators'
export * from './exceptions'
export * from './caseParser'
export { JSBI }

export const scriptToHash = (script: BranchComponents.Script) => {
  if (!script) throw new ParameterRequiredException('Script')
  const serializedScript = serializeScript(script)
  const s = blake2b(32, null, null, PERSONAL)
  s.update(hexToBytes(serializedScript))
  const digest = s.digest('hex')
  return `0x${digest}` as string
}

export const rawTransactionToHash = (rawTransaction: Omit<BranchComponents.RawTransaction, 'witnesses'>) => {
  if (!rawTransaction) throw new ParameterRequiredException('Raw transaction')
  const serializedRawTransaction = serializeRawTransaction(rawTransaction)
  const s = blake2b(32, null, null, PERSONAL)
  s.update(hexToBytes(serializedRawTransaction))
  const digest = s.digest('hex')
  return `0x${digest}` as string
}

export const privateKeyToPublicKey = (privateKey: string) => {
  const keyPair = new ECPair(privateKey)
  return keyPair.publicKey
}

export const privateKeyToAddress = (privateKey: string, options: AddressOptions) =>
  pubkeyToAddress(privateKeyToPublicKey(privateKey), options)

export const extractDAOData = (dao: BranchComponents.DAO) => {
  if (!dao.startsWith('0x')) {
    throw new HexStringWithout0xException(dao)
  }
  const value = dao.replace('0x', '')
  return {
    c: toBigEndian(`0x${value.slice(0, 16)}`),
    ar: toBigEndian(`0x${value.slice(16, 32)}`),
    s: toBigEndian(`0x${value.slice(32, 48)}`),
    u: toBigEndian(`0x${value.slice(48, 64)}`),
  }
}

export const calculateMaximumWithdraw = (
  outputCell: BranchComponents.CellOutput,
  outputDataCapacity: BranchComponents.Bytes,
  depositDAO: BranchComponents.DAO,
  withdrawDAO: BranchComponents.DAO,
) => {
  const depositCellSerialized = cellOccupied(outputCell) + outputDataCapacity.slice(2).length / 2
  const occupiedCapacity = JSBI.asUintN(128, JSBI.multiply(JSBI.BigInt(100000000), JSBI.BigInt(depositCellSerialized)))
  return `0x${JSBI.add(
    JSBI.divide(
      JSBI.multiply(
        JSBI.subtract(JSBI.asUintN(128, JSBI.BigInt(outputCell.capacity)), occupiedCapacity),
        JSBI.asUintN(128, JSBI.BigInt(extractDAOData(withdrawDAO).ar)),
      ),
      JSBI.asUintN(128, JSBI.BigInt(extractDAOData(depositDAO).ar)),
    ),
    occupiedCapacity,
  ).toString(16)}`
}

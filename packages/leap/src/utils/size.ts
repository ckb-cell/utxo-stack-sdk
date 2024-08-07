import { BranchComponents, remove0x } from '@utxo-stack/branch'
import { CKB_UNIT } from 'src/constants'

// Minimum occupied capacity and 1 ckb for transaction fee
// Assume UDT cell data size is 16bytes
// The default length of xut type args is 32 bytes
const DEFAULT_UDT_ARGS_SIZE = 32
const CELL_CAPACITY_SIZE = 8
const UDT_CELL_DATA_SIZE = 16
export const calculateCellCapacity = (lock: BranchComponents.Script, udtType?: BranchComponents.Script): bigint => {
  const lockArgsSize = remove0x(lock.args).length / 2
  const typeArgsSize = udtType ? remove0x(udtType.args).length / 2 : DEFAULT_UDT_ARGS_SIZE
  const lockSize = 33 + lockArgsSize
  const typeSize = 33 + typeArgsSize
  const cellSize = lockSize + typeSize + CELL_CAPACITY_SIZE + UDT_CELL_DATA_SIZE
  return BigInt(cellSize + 1) * CKB_UNIT
}

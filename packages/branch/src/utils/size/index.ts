import { BranchComponents } from '../../types'
import { serializeWitnessArgs, serializeTransaction } from '../serialization/transaction'

const codeHashOccupied = 32
const hashTypeOccupied = 1

export const scriptOccupied = (script: BranchComponents.Script) => {
  return script.args.slice(2).length / 2 + codeHashOccupied + hashTypeOccupied
}

export const cellOccupied = (cell: BranchComponents.CellOutput) => {
  return 8 + scriptOccupied(cell.lock) + (cell.type ? scriptOccupied(cell.type) : 0)
}

/**
 * @function calculateTransactionFee
 * @description calculate the transaction fee by transaction size and fee rate
 * @param {string | number} transactionSize, the byte size of transaction
 * @param {string | number} feeRate, the fee rate with unit of satoshi/KB
 * @returns {string} transactionFee
 */
export const calculateTransactionFee = (transactionSize: string | number, feeRate: string | number): string => {
  const ratio = BigInt(1000)
  const base = BigInt(`${transactionSize}`) * BigInt(`${feeRate}`)
  const fee = base / ratio
  if (fee * ratio < base) {
    return `0x${(fee + BigInt(1)).toString(16)}`
  }
  return `0x${fee.toString(16)}`
}

/**
 * @name getTransactionSize
 * @description return the size of a transaction cost in a block, 4 bytes more than the serialized transaction.
 * @param {Object} transaction - Raw transaction
 * @returns {String} Virtual size of a transaction in a block
 */
export const getTransactionSize = (transaction: BranchComponents.RawTransactionToSign) => {
  const tx = {
    ...transaction,
    witnesses: transaction.witnesses.map(wit => (typeof wit === 'string' ? wit : serializeWitnessArgs(wit))),
  }
  // extra 4 bytes size due to the cost of serialized tx in a block
  const VIRTUAL_COST = 4
  const serializedTransaction = serializeTransaction(tx)
  return serializedTransaction.slice(2).length / 2 + VIRTUAL_COST
}

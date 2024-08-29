import {
  addressToScript,
  append0x,
  BranchComponents,
  calculateTransactionFee,
  EMPTY_WITNESS_ARGS,
  getTransactionSize,
  scriptToHash,
  toUint128Le,
} from '@utxo-stack/branch'
import {
  getBranchRequestLockScript,
  getBranchXudtDep,
  getBranchXudtTypeScript,
  MAX_FEE,
  WITNESS_LOCK_DEFAULT_PLACEHOLDER,
} from 'src/constants'
import { LeapingFromBranchToCkbParams, RequestType } from 'src/types'
import { buildRequestLockArgs } from './lock-args'
import { calculateCellCapacity } from 'src/utils'

// xUDT args on Branch Dev chain
const TEMP_LEAP_BRANCH_XUDT_ARGS = '0xc219351b150b900e50a7039f1e448b844110927e5fd9bd30425806cb8ddff1fd'

export const genLeapingFromBranchToCkbRequestTx = async ({
  branchCollector,
  fromBranchAddress,
  assetTypeScript,
  transferAmount,
  requestTypeHash,
  timeout,
  isMainnet,
  feeRate,
  witnessLockPlaceholderSize,
}: LeapingFromBranchToCkbParams) => {
  const fromLock = addressToScript(fromBranchAddress)
  const requestLockScript: BranchComponents.Script = {
    ...getBranchRequestLockScript(isMainnet),
    args: buildRequestLockArgs({
      ownerLockHash: scriptToHash(fromLock),
      assetTypeHash: scriptToHash(assetTypeScript),
      transferAmount,
      requestType: RequestType.BranchToCkb,
      requestTypeHash,
      timeout,
    }),
  }

  const branchXUDTType = {
    ...getBranchXudtTypeScript(isMainnet),
    args: TEMP_LEAP_BRANCH_XUDT_ARGS,
  }

  const requestCellCapacity = calculateCellCapacity(requestLockScript)
  const requestOutput: BranchComponents.CellOutput = {
    lock: requestLockScript,
    type: branchXUDTType,
    capacity: append0x(requestCellCapacity.toString(16)),
  }

  const assetCells = await branchCollector.getCells({ lock: fromLock, type: branchXUDTType })
  const { udtInputs, sumUdtInputsCapacity, sumAmount } = branchCollector.collectUdtInputs(assetCells, transferAmount)

  let actualInputsCapacity = sumUdtInputsCapacity
  let sumUdtOutputCapacity = requestCellCapacity
  let inputs = udtInputs

  const outputs: BranchComponents.CellOutput[] = [requestOutput]
  const outputsData = [append0x(toUint128Le(transferAmount))]

  if (sumAmount > transferAmount) {
    const udtChangeCapacity = calculateCellCapacity(fromLock, branchXUDTType)
    outputs.push({
      lock: fromLock,
      type: branchXUDTType,
      capacity: append0x(udtChangeCapacity.toString(16)),
    })
    outputsData.push(append0x(toUint128Le(sumAmount - transferAmount)))
    sumUdtOutputCapacity += udtChangeCapacity
  }

  const txFee = MAX_FEE
  if (sumUdtInputsCapacity <= sumUdtOutputCapacity) {
    let emptyCells = await branchCollector.getCells({
      lock: fromLock,
    })
    if (!emptyCells || emptyCells.length === 0) {
      throw new Error('The address has no empty cells')
    }
    emptyCells = emptyCells.filter(cell => !cell.output.type)
    const needCapacity = sumUdtOutputCapacity - sumUdtInputsCapacity
    const { inputs: emptyInputs, sumInputsCapacity: sumEmptyCapacity } = branchCollector.collectInputs(
      emptyCells,
      needCapacity,
      txFee,
    )
    inputs = [...inputs, ...emptyInputs]
    actualInputsCapacity += sumEmptyCapacity
  }

  let changeCapacity = actualInputsCapacity - sumUdtOutputCapacity
  outputs.push({
    lock: fromLock,
    capacity: append0x(changeCapacity.toString(16)),
  })
  outputsData.push('0x')

  const witnesses = inputs.map((_, index) => (index === 0 ? EMPTY_WITNESS_ARGS : '0x'))

  const cellDeps = [getBranchXudtDep(isMainnet)]

  const unsignedTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses,
  }

  if (txFee === MAX_FEE) {
    const txSize = getTransactionSize(unsignedTx) + (witnessLockPlaceholderSize ?? WITNESS_LOCK_DEFAULT_PLACEHOLDER)
    const estimatedTxFee = BigInt(calculateTransactionFee(txSize, feeRate ?? 1100))
    changeCapacity -= estimatedTxFee
    unsignedTx.outputs[unsignedTx.outputs.length - 1].capacity = append0x(changeCapacity.toString(16))
  }

  return unsignedTx
}

export const genLeapingCapacityToCkbRequestTx = async ({
  branchCollector,
  fromCkbAddress,
  fromBranchAddress,
  assetTypeScript,
  transferAmount,
  requestTypeHash,
  timeout,
  isMainnet,
  feeRate,
  witnessLockPlaceholderSize,
}: LeapingFromBranchToCkbParams) => {
  const fromBranchLock = addressToScript(fromBranchAddress)
  const requestLockScript: BranchComponents.Script = {
    ...getBranchRequestLockScript(isMainnet),
    args: buildRequestLockArgs({
      ownerLockHash: scriptToHash(addressToScript(fromCkbAddress!)),
      assetTypeHash: scriptToHash(assetTypeScript),
      transferAmount,
      requestType: RequestType.BranchToCkb,
      requestTypeHash,
      timeout,
    }),
  }

  const requestCellCapacity = calculateCellCapacity(requestLockScript)
  const requestOutput: BranchComponents.CellOutput = {
    lock: requestLockScript,
    capacity: append0x(requestCellCapacity.toString(16)),
  }

  const outputs: BranchComponents.CellOutput[] = [requestOutput]
  const outputsData = ['0x']

  const txFee = MAX_FEE
  let emptyCells = await branchCollector.getCells({
    lock: fromBranchLock,
  })
  if (!emptyCells || emptyCells.length === 0) {
    throw new Error('The address has no empty cells')
  }
  emptyCells = emptyCells.filter(cell => !cell.output.type)
  const { inputs, sumInputsCapacity } = branchCollector.collectInputs(emptyCells, requestCellCapacity, txFee)

  let changeCapacity = sumInputsCapacity - requestCellCapacity
  outputs.push({
    lock: fromBranchLock,
    capacity: append0x(changeCapacity.toString(16)),
  })
  outputsData.push('0x')

  const witnesses = inputs.map((_, index) => (index === 0 ? EMPTY_WITNESS_ARGS : '0x'))

  const cellDeps: BranchComponents.CellDep[] = []

  const unsignedTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses,
  }

  if (txFee === MAX_FEE) {
    const txSize = getTransactionSize(unsignedTx) + (witnessLockPlaceholderSize ?? WITNESS_LOCK_DEFAULT_PLACEHOLDER)
    const estimatedTxFee = BigInt(calculateTransactionFee(txSize, feeRate ?? 1100))
    changeCapacity -= estimatedTxFee
    unsignedTx.outputs[unsignedTx.outputs.length - 1].capacity = append0x(changeCapacity.toString(16))
  }

  return unsignedTx
}

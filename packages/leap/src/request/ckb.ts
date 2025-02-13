import {
  addressToScript,
  append0x,
  BranchComponents,
  calculateTransactionFee,
  EMPTY_WITNESS_ARGS,
  getTransactionSize,
  Hex,
  scriptToHash,
  toUint128Le,
} from '@utxo-stack/branch'
import {
  getCkbRequestDep,
  getCkbRequestLockScript,
  getCkbXudtDep,
  MAX_FEE,
  WITNESS_LOCK_DEFAULT_PLACEHOLDER,
} from 'src/constants'
import { LeapingFromCkbToBranchParams, RequestType, UnlockCkbRequestCellsParams } from 'src/types'
import { buildRequestLockArgs } from './lock-args'
import { calculateCellCapacity } from 'src/utils'
import { RequestLockArgs } from 'src/molecule/generated/leap'

export const genLeapingFromCkbToBranchRequestTx = async ({
  ckbCollector,
  fromCkbAddress,
  assetTypeScript,
  transferAmount,
  requestTypeHash,
  timeout,
  targetChainId,
  isMainnet,
  feeRate,
  witnessLockPlaceholderSize,
}: LeapingFromCkbToBranchParams) => {
  const fromLock = addressToScript(fromCkbAddress)
  const requestLockScript: BranchComponents.Script = {
    ...getCkbRequestLockScript(isMainnet),
    args: buildRequestLockArgs({
      ownerLockHash: scriptToHash(fromLock),
      assetTypeHash: scriptToHash(assetTypeScript),
      transferAmount,
      requestType: RequestType.CkbToBranch,
      requestTypeHash,
      timeout,
      targetChainId,
    }),
  }
  const requestCellCapacity = calculateCellCapacity(requestLockScript)
  const requestOutput: BranchComponents.CellOutput = {
    lock: requestLockScript,
    type: assetTypeScript,
    capacity: append0x(requestCellCapacity.toString(16)),
  }

  const assetCells = await ckbCollector.getCells({ lock: fromLock, type: assetTypeScript })
  const { udtInputs, sumUdtInputsCapacity, sumAmount } = ckbCollector.collectUdtInputs(assetCells, transferAmount)

  let actualInputsCapacity = sumUdtInputsCapacity
  let sumUdtOutputCapacity = requestCellCapacity
  let inputs = udtInputs

  const outputs: BranchComponents.CellOutput[] = [requestOutput]
  const outputsData = [append0x(toUint128Le(transferAmount))]

  if (sumAmount > transferAmount) {
    const udtChangeCapacity = calculateCellCapacity(fromLock, assetTypeScript)
    outputs.push({
      lock: fromLock,
      type: assetTypeScript,
      capacity: append0x(udtChangeCapacity.toString(16)),
    })
    outputsData.push(append0x(toUint128Le(sumAmount - transferAmount)))
    sumUdtOutputCapacity += udtChangeCapacity
  }

  const txFee = MAX_FEE
  if (sumUdtInputsCapacity <= sumUdtOutputCapacity) {
    let emptyCells = await ckbCollector.getCells({
      lock: fromLock,
    })
    if (!emptyCells || emptyCells.length === 0) {
      throw new Error('The address has no empty cells')
    }
    emptyCells = emptyCells.filter(cell => !cell.output.type)
    const needCapacity = sumUdtOutputCapacity - sumUdtInputsCapacity
    const { inputs: emptyInputs, sumInputsCapacity: sumEmptyCapacity } = ckbCollector.collectInputs(
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

  const cellDeps = [getCkbXudtDep(isMainnet)]

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

export const genUnlockingCkbRequestCellsTx = async ({
  ckbCollector,
  ckbAddress,
  requestOutPoints,
  isMainnet,
  feeRate,
  witnessLockPlaceholderSize,
}: UnlockCkbRequestCellsParams) => {
  const requestTransactions = await ckbCollector.getTransactionsByOutPoints(requestOutPoints)
  const { codeHash, hashType } = getCkbRequestLockScript(isMainnet)
  const lock = addressToScript(ckbAddress)

  const inputs: BranchComponents.CellInput[] = []
  const outputs: BranchComponents.CellOutput[] = []
  const outputsData: Hex[] = []
  for (let index = 0; index < requestOutPoints.length; index++) {
    const tx = requestTransactions[index]
    const outPoint = requestOutPoints[index]
    const txIndex = parseInt(outPoint.index, 16)
    const requestOutput = tx.outputs[txIndex]
    if (requestOutput) {
      if (requestOutput.lock.hashType !== hashType || requestOutput.lock.codeHash !== codeHash) {
        throw new Error('No request cells found with specific out points')
      }
      const { timeout } = RequestLockArgs.unpack(requestOutput.lock.args)
      inputs.push({
        previousOutput: outPoint,
        since: append0x(timeout.toHexString()),
      })
      outputs.push({
        ...requestOutput,
        lock,
      })
      outputsData.push(tx.outputsData[txIndex])
    }
  }

  // Collect an empty cell to pay transaction fee
  let emptyCells = await ckbCollector.getCells({
    lock,
  })
  if (!emptyCells || emptyCells.length === 0) {
    throw new Error('The address has no empty cells')
  }
  emptyCells = emptyCells.filter(cell => !cell.output.type)
  const payFeeCell = emptyCells[0]
  inputs.push({
    previousOutput: payFeeCell.outPoint,
    since: '0x0',
  })
  outputs.push(payFeeCell.output)
  outputsData.push(payFeeCell.outputData)

  const witnesses = inputs.map((_, index) => (index === inputs.length - 1 ? EMPTY_WITNESS_ARGS : '0x'))

  const cellDeps = [getCkbXudtDep(isMainnet), getCkbRequestDep(isMainnet)]

  const unsignedTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses,
  }

  const txSize = getTransactionSize(unsignedTx) + (witnessLockPlaceholderSize ?? WITNESS_LOCK_DEFAULT_PLACEHOLDER)
  const estimatedTxFee = BigInt(calculateTransactionFee(txSize, feeRate ?? 1100))
  const lastCapacity = BigInt(outputs[outputs.length - 1].capacity)
  unsignedTx.outputs[outputs.length - 1].capacity = append0x((lastCapacity - estimatedTxFee).toString(16))

  return unsignedTx
}

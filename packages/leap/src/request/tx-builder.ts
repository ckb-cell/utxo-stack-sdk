import {
  addressToScript,
  append0x,
  BranchComponents,
  calculateTransactionFee,
  getTransactionSize,
  Hex,
  scriptToHash,
  toUint128Le,
} from '@utxo-stack/branch'
import { getRequestDep, getRequestLockScript, getXudtDep, MAX_FEE } from 'src/constants'
import { LeapingFromCkbToBranchParams, RequestType, UnlockRequestCellsParams } from 'src/types'
import { buildRequestLockArgs } from './lock-args'
import { calculateCellCapacity } from 'src/utils'
import { RequestLockArgs } from 'src/molecule/generated/leap'

export const genLeapingFromCkbToBranchRequestTx = async ({
  collector,
  fromCkbAddress,
  assetTypeScript,
  transferAmount,
  requestTypeHash,
  timeout,
  targetChainId,
  isMainnet,
  feeRate,
}: LeapingFromCkbToBranchParams) => {
  const fromLock = addressToScript(fromCkbAddress)
  const requestLockScript: BranchComponents.Script = {
    ...getRequestLockScript(isMainnet),
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

  const assetCells = await collector.getCells({ lock: fromLock, type: assetTypeScript })
  const { udtInputs, sumUdtInputsCapacity, sumAmount } = collector.collectUdtInputs(assetCells, transferAmount)

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
    let emptyCells = await collector.getCells({
      lock: fromLock,
    })
    if (!emptyCells || emptyCells.length === 0) {
      throw new Error('The address has no empty cells')
    }
    emptyCells = emptyCells.filter(cell => !cell.output.type)
    const needCapacity = sumUdtOutputCapacity - sumUdtInputsCapacity
    const { inputs: emptyInputs, sumInputsCapacity: sumEmptyCapacity } = collector.collectInputs(
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

  const witnesses = new Array(inputs.length).fill('0x')

  const cellDeps = [getXudtDep(isMainnet)]

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
    const txSize = getTransactionSize(unsignedTx)
    const estimatedTxFee = BigInt(calculateTransactionFee(txSize, feeRate ?? 1100))
    changeCapacity -= estimatedTxFee
    unsignedTx.outputs[unsignedTx.outputs.length - 1].capacity = append0x(changeCapacity.toString(16))
  }

  return unsignedTx
}

export const genUnlockingRequestCellsTx = async ({
  collector,
  ckbAddress,
  requestOutPoints,
  isMainnet,
  feeRate,
}: UnlockRequestCellsParams) => {
  const requestTransactions = await collector.getTransactionsByOutPoints(requestOutPoints)
  const { codeHash, args } = getRequestLockScript(isMainnet)
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
      if (requestOutput.lock.args !== args || requestOutput.lock.codeHash !== codeHash) {
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

  const witnesses = new Array(inputs.length).fill('0x')

  const cellDeps = [getXudtDep(isMainnet), getRequestDep(isMainnet)]

  const unsignedTx = {
    version: '0x0',
    cellDeps,
    headerDeps: [],
    inputs,
    outputs,
    outputsData,
    witnesses,
  }

  const txSize = getTransactionSize(unsignedTx)
  const estimatedTxFee = BigInt(calculateTransactionFee(txSize, feeRate ?? 1100))
  const lastCapacity = BigInt(outputs[outputs.length - 1].capacity)
  unsignedTx.outputs[outputs.length - 1].capacity = append0x((lastCapacity - estimatedTxFee).toString(16))

  return unsignedTx
}

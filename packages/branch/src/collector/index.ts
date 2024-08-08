import { Branch } from '../signer'
import { CellIndexer } from '../indexer'
import { BranchComponents, CollectResult, CollectUdtResult, Hex, IndexerCell, IndexerSearchKey } from '../types'
import { remove0x, leToUInt } from 'src/utils'

const MIN_CAPACITY = BigInt(61)

export class Collector {
  branch: Branch
  indexer: CellIndexer

  constructor(nodeUrl: string) {
    this.branch = new Branch(nodeUrl)
    this.indexer = new CellIndexer(nodeUrl)
  }

  async getCells({
    lock,
    type,
    isDataMustBeEmpty = true,
    outputCapacityRange,
  }: {
    lock?: BranchComponents.Script
    type?: BranchComponents.Script
    isDataMustBeEmpty?: boolean
    outputCapacityRange?: Hex[]
  }): Promise<IndexerCell[]> {
    const searchKey: IndexerSearchKey = lock
      ? {
          scriptSearchMode: 'exact',
          script: lock,
          scriptType: 'lock',
          filter: {
            script: type,
            outputDataLenRange: isDataMustBeEmpty && !type ? ['0x0', '0x1'] : undefined,
            outputCapacityRange: outputCapacityRange,
          },
        }
      : {
          scriptSearchMode: 'exact',
          script: type,
          scriptType: 'type',
        }
    return this.indexer.getCells(searchKey, { order: 'asc', limit: 100 })
  }

  collectInputs(
    liveCells: IndexerCell[],
    needCapacity: bigint,
    fee: bigint,
    changeCapacity = MIN_CAPACITY,
  ): CollectResult {
    const inputs: BranchComponents.CellInput[] = []
    let sumInputsCapacity = BigInt(0)
    for (const cell of liveCells) {
      inputs.push({
        previousOutput: cell.outPoint,
        since: '0x0',
      })
      sumInputsCapacity += BigInt(cell.output.capacity)
      if (sumInputsCapacity >= needCapacity + changeCapacity + fee) {
        break
      }
    }
    if (sumInputsCapacity < needCapacity + changeCapacity + fee) {
      throw new Error('Insufficient free Branch chain balance')
    }
    return { inputs, sumInputsCapacity }
  }

  collectUdtInputs(liveCells: IndexerCell[], needAmount: bigint): CollectUdtResult {
    const udtInputs: BranchComponents.CellInput[] = []
    let sumUdtInputsCapacity = BigInt(0)
    let sumAmount = BigInt(0)
    for (const cell of liveCells) {
      if (cell.outputData === '0x') {
        continue
      }
      udtInputs.push({
        previousOutput: {
          txHash: cell.outPoint.txHash,
          index: cell.outPoint.index,
        },
        since: '0x0',
      })
      sumUdtInputsCapacity = sumUdtInputsCapacity + BigInt(cell.output.capacity)
      // XUDT cell.data = <amount: uint128> <xudt data (optional)>
      // Ref: https://blog.cryptape.com/enhance-sudts-programmability-with-xudt#heading-xudt-cell
      sumAmount += leToUInt(remove0x(cell.outputData).slice(0, 32))
      if (sumAmount >= needAmount) {
        break
      }
    }
    if (sumAmount < needAmount) {
      throw new Error('Insufficient UDT balance')
    }
    return { udtInputs, sumUdtInputsCapacity, sumAmount }
  }

  async getLiveCell(outPoint: BranchComponents.OutPoint, withData = false): Promise<BranchComponents.LiveCell> {
    const { cell } = await this.branch.rpc.getLiveCell(outPoint, withData)
    return cell
  }

  async getLiveCells(outPoints: BranchComponents.OutPoint[], withData = false): Promise<BranchComponents.LiveCell[]> {
    const batch = this.branch.rpc.createBatchRequest(outPoints.map(outPoint => ['getLiveCell', outPoint, withData]))
    return batch.exec().then(liveCells => liveCells.map(liveCell => liveCell.cell))
  }

  async getTransactionsByOutPoints(outPoints: BranchComponents.OutPoint[]): Promise<BranchComponents.Transaction[]> {
    const batch = this.branch.rpc.createBatchRequest(outPoints.map(({ txHash }) => ['getTransaction', txHash]))
    return batch.exec().then(txs => txs.map(tx => tx.transaction))
  }
}
